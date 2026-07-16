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

import { basename, join } from "node:path";
import { cp } from "node:fs/promises";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { LuaRocksUnixBuildInfo, LuaRocksWindowsBuildInfo } from "../Building/LuaRocksBuildInfo";
import { executeProcess } from "../../../Util/ExecuteProcess";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksWindowsSourcesInfoDetails } from "../Configuration/LuaRocksSourcesInfo";
import { LuaRocksPostInstallTarget } from "./LuaRocksPostInstallTarget";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { Console } from "../../../Console";

export class LuaRocksInstallTarget implements ITarget {
    private parent: ITarget | null;
    private project: LuaRocksProject;
    private buildInfo: LuaRocksUnixBuildInfo | LuaRocksWindowsBuildInfo;
    constructor(project: LuaRocksProject, parent: ITarget | null, buildInfo: LuaRocksUnixBuildInfo | LuaRocksWindowsBuildInfo) {
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Install LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getLuaRocksBuildInfo(): LuaRocksUnixBuildInfo | LuaRocksWindowsBuildInfo {
        return this.buildInfo;
    }
    getNext(): ITarget | null {
        return new LuaRocksPostInstallTarget(this.project, this);
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const info = this.buildInfo;
            const sourcesInfo = info.getSourcesInfo();
            const infoDetails = sourcesInfo.getDetails();
            if (info instanceof LuaRocksUnixBuildInfo) {
                const makeArgs = info.getMakeArguments().createCopy();
                makeArgs.push("install");
                if (infoDetails instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                    executeProcess(
                        infoDetails.getBash(), {
                            args: ["-lc", `${info.getMake()} ${makeArgs.join(" ")}`],
                            verbose: true,
                            stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            resolve();
                        })
                        .catch(reject);
                }
                else {
                    executeProcess(
                        info.getMake(), {
                            args: makeArgs,
                            verbose: true,
                            stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            resolve();
                        })
                        .catch(reject);
                }
            }
            else {
                if (infoDetails instanceof LuaRocksWindowsSourcesInfoDetails) {
                    const binDir = this.project.getInstallBinDir();
                    const filesToCopy: string[] = [
                        infoDetails.getLuaRocks(),
                        infoDetails.getLuaRocksAdmin()
                    ];
                    const file_iter = (i: number) => {
                        if (i < filesToCopy.length) {
                            const sourceFile = filesToCopy[i];
                            const destinationFile = join(binDir, basename(sourceFile));

                            cp(sourceFile, destinationFile, { force: true })
                                .then(() => {
                                    file_iter(i + 1);
                                })
                                .catch(reject);
                        }
                        else {
                            resolve();
                        }
                    };

                    file_iter(0);
                }
                else {
                    reject(new Error("Internal error: LuaRocks sources info details for Windows expected."));
                }
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Install LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}