/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

import { join } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { IReadOnlyArray } from "../../../Util/IReadOnlyArray";
import { PucLuaCompileStaticLibTarget } from "./PucLuaCompileStaticLibTarget";
import { isGccLikeToolchain, IGccLikeToolchain } from "../../../Toolchains/GCC/IGccLikeToolchain";
import { PucLuaSourcesInfo } from "../Configuration/PucLuaSourcesInfo";
import { PucLuaCompileInterpreterTarget } from "./PucLuaCompileInterpreterTarget";
import { Console } from "../../../Console";

export class PucLuaArchiveStaticLibTarget implements ITarget {
    private parent: PucLuaCompileStaticLibTarget;
    private project: PucLuaProject;
    private objFiles: IReadOnlyArray<string>;
    private staticLibrary: string | undefined;
    constructor(project: PucLuaProject, parent: PucLuaCompileStaticLibTarget) {
        this.project = project;
        this.parent = parent;
        this.objFiles = parent.getStaticLibObjectFiles();
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Archive Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getNext(): ITarget | null {
        return new PucLuaCompileInterpreterTarget(this.project, this);
    }
    getStaticLibObjectFiles(): IReadOnlyArray<string> {
        return this.objFiles;
    }
    getStaticLibrary(): string {
        return <string>this.staticLibrary;
    }
    getSourcesInfo(): PucLuaSourcesInfo {
        return this.parent.getSourcesInfo();
    }
    getSharedLibrary(): string {
        return this.parent.getSharedLibrary();
    }
    getImportLibrary(): string | undefined {
        return this.parent.getImportLibrary();
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const version = this.project.getVersion();
            const libName = `lua${version.getMajor()}${version.getMinor()}`;
            const toolchain = this.project.getToolchain();
            const archiver = toolchain.getArchiver();
            const isGccLike = isGccLikeToolchain(toolchain);
            const archivePrefix = isGccLike ? "lib" : "";
            const archiveSuffix = isGccLike ? "" : "-static";
            const archiveExt = archiver.getArchiveExtension();
            const archiveName = `${archivePrefix}${libName}${archiveSuffix}${archiveExt}`;
            const archive = join(this.project.getStaticLibBuildDir(), archiveName);
            archiver.reset();
            if (isGccLike) {
                archiver.addFlag("cru");
            }
            const len = this.objFiles.getLenght();
            for (let i = 0; i < len; i++) {
                archiver.addInputFile(this.objFiles.getItem(i));
            }
            archiver.setOutputFile(archive);
            archiver.execute()
                .then(() => {
                    if (isGccLike) {
                        const gccLikeToolchain = <IGccLikeToolchain>toolchain;
                        const ranlib = gccLikeToolchain.getRanlib();
                        ranlib.reset();
                        ranlib.setInputFile(archive);
                        ranlib.execute()
                            .then(() => {
                                this.staticLibrary = archive;
                                resolve();
                            })
                            .catch(reject);
                    }
                    else {
                        this.staticLibrary = archive;
                        resolve();
                    }
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Archive Lua ${this.project.getVersion().getString()} static library`);
            resolve();
        });
    }
}