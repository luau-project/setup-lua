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
import { readdir, stat } from "node:fs/promises";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaJitProject } from "../LuaJitProject";
import { AbstractFetchTarballTarget } from "../../Targets/Fetch/AbstractFetchTarballTarget";
import { LuaJitRepositoryVersion, OpenRestyRepositoryVersion } from "../LuaJitRepositoryVersion";
import { LuaJitApplyPatchesTarget } from "./LuaJitApplyPatchesTarget";
import { Console } from "../../../Console";

export class LuaJitFetchTarget extends AbstractFetchTarballTarget {
    private parent: ITarget | null;
    private project: LuaJitProject;
    private extractedDir?: string;
    constructor(project: LuaJitProject, parent: ITarget | null) {
        super(
            `${project.getVersion().getRepository()}/archive/${project.getVersion().getRef()}.tar.gz`,
            project.getBuildDir(),
            null
        )
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Fetch ${projectVersion.getName()} ${projectVersion.getRef()} source code`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getExtractedDir(): string {
        return <string>(this.extractedDir);
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            super.execute()
                .then(() => {
                    const workDir = this.getWorkDir();
                    readdir(workDir, { recursive: false })
                        .then(items => {
                            const len = items.length;
                            const dirItem_iter = (i: number) => {
                                if (i < len) {
                                    const dirItem = items[i];
                                    if (
                                        (projectVersion instanceof LuaJitRepositoryVersion && dirItem.startsWith("LuaJIT-"))
                                        ||
                                        (projectVersion instanceof OpenRestyRepositoryVersion && dirItem.startsWith("luajit2-"))
                                    ) {
                                        const dirItemFullPath = join(workDir, dirItem);
                                        stat(dirItemFullPath)
                                            .then(s => {
                                                if (s.isDirectory()) {
                                                    this.extractedDir = dirItemFullPath;
                                                    resolve();
                                                }
                                                else {
                                                    dirItem_iter(i + 1);
                                                }
                                            })
                                            .catch(reject);
                                    }
                                    else {
                                        dirItem_iter(i + 1);
                                    }
                                }
                                else {
                                    reject(new Error(`Extracted directory for ${projectVersion.getName()} ${projectVersion.getRef()} was not found`));
                                }
                            };

                            dirItem_iter(0);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    getNext(): ITarget | null {
        return new LuaJitApplyPatchesTarget(this.project, this);
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Fetch ${projectVersion.getName()} ${projectVersion.getRef()} source code`);
            resolve();
        });
    }
}