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

import { cp } from "node:fs/promises";
import { basename, join } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaCreateInstallationDirectoriesTarget } from "./PucLuaCreateInstallationDirectoriesTarget";
import { sequentialPromises } from "../../../Util/SequentialPromises";
import { PucLuaPostInstallTarget } from "./PucLuaPostInstallTarget";
import { Console } from "../../../Console";

export class PucLuaCopyInstallableArtifactsTarget implements ITarget {
    private parent: PucLuaCreateInstallationDirectoriesTarget;
    private project: PucLuaProject;
    constructor(project: PucLuaProject, parent: PucLuaCreateInstallationDirectoriesTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Copy Lua ${this.project.getVersion().getString()} installation files`);
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
        return new PucLuaPostInstallTarget(this.project, this);
    }
    private copyInterpreter(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtInterpreter = this.parent.getBuildInfo().getInterpreter();
            const binDir = this.project.getInstallBinDir();
            const interpreter = join(binDir, basename(builtInterpreter));

            cp(builtInterpreter, interpreter, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    private copyCompiler(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtCompiler = this.parent.getBuildInfo().getCompiler();
            const binDir = this.project.getInstallBinDir();
            const compiler = join(binDir, basename(builtCompiler));

            cp(builtCompiler, compiler, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    private copySharedLibrary(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtSharedLib = this.parent.getBuildInfo().getSharedLibrary();
            const targetInstallDir = process.platform === 'win32' || process.platform === 'cygwin' ?
                this.project.getInstallBinDir() :
                this.project.getInstallLibDir();
            const sharedLib = join(targetInstallDir, basename(builtSharedLib));

            cp(builtSharedLib, sharedLib, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    private copyStaticLibrary(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtStaticLib = this.parent.getBuildInfo().getStaticLibrary();
            const libDir = this.project.getInstallLibDir();
            const staticLib = join(libDir, basename(builtStaticLib));

            cp(builtStaticLib, staticLib, { force: true })
                .then(resolve)
                .catch(reject);
        });
    }
    private copyImportLibrary(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtImpLib = this.parent.getBuildInfo().getImportLibrary();
            if (builtImpLib) {
                const libDir = this.project.getInstallLibDir();
                const impLib = join(libDir, basename(builtImpLib));

                cp(builtImpLib, impLib, { force: true })
                    .then(resolve)
                    .catch(reject);
            }
            else {
                resolve();
            }
        });
    }
    private copyHeaders(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const includeDir = this.project.getInstallIncludeDir();
            const headers = this.parent.getBuildInfo().getSourcesInfo().getHeaderFiles();
            const len = headers.getLenght();

            const header_iter = (i: number) => {
                if (i < len) {
                    const sourceHeader = headers.getItem(i);
                    const h = join(includeDir, basename(sourceHeader));

                    cp(sourceHeader, h, { force: true })
                        .then(() => {
                            header_iter(i + 1);
                        })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };

            header_iter(0);
        });
    }
    private copyManFiles(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const manDir = this.project.getInstallManDir();
            const manFiles = this.parent.getBuildInfo().getSourcesInfo().getManFiles();
            const len = manFiles.getLenght();

            const man_iter = (i: number) => {
                if (i < len) {
                    const sourceMan = manFiles.getItem(i);
                    const man = join(manDir, basename(sourceMan));

                    cp(sourceMan, man, { force: true })
                        .then(() => {
                            man_iter(i + 1);
                        })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };

            man_iter(0);
        });
    }
    private copyPkgConfigFile(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const builtPkgConfigFile = this.parent.getBuildInfo().getPkgConfigFile();
            const pkgConfigDir = this.project.getInstallPkgConfigDir();
            const pkgConfigFile = join(pkgConfigDir, basename(builtPkgConfigFile));

            cp(builtPkgConfigFile, pkgConfigFile, { force: true })
                    .then(resolve)
                    .catch(reject);
        });
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            sequentialPromises<void>([
                () => this.copyInterpreter(),
                () => this.copyCompiler(),
                () => this.copySharedLibrary(),
                () => this.copyStaticLibrary(),
                () => this.copyImportLibrary(),
                () => this.copyHeaders(),
                () => this.copyManFiles(),
                () => this.copyPkgConfigFile()
            ])
                .then(value => {
                    resolve();
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Copy Lua ${this.project.getVersion().getString()} installation files`);
            resolve();
        });
    }
}