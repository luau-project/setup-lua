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

import { basename } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { executeProcess } from "../../../Util/ExecuteProcess";
import { LuaRocksApplyPatchesTarget } from "./LuaRocksApplyPatchesTarget";
import { LuaRocksFinishConfigurationTarget } from "./LuaRocksFinishConfigurationTarget";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksUnixSourcesInfoDetails } from "./LuaRocksSourcesInfo";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { Console } from "../../../Console";
import { isCygwin } from "../../../Util/CygwinDetection";

export class LuaRocksConfigureSourcesTarget implements ITarget {
    private parent: LuaRocksApplyPatchesTarget;
    private project: LuaRocksProject;
    constructor(project: LuaRocksProject, parent: LuaRocksApplyPatchesTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
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
        return new LuaRocksFinishConfigurationTarget(this.project, this);
    }
    private setConfigurationResult(): void {
        this.project.configurationResult()
            .setValue(this.parent.getLuaRocksSourcesInfo());
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const luaInstallation = this.project.getLuaInstallation();
            const interpreter = basename(luaInstallation.getLuaInterpreter());
            const luaShortVersion = luaInstallation.getLuaShortVersion();
            const cygwin = isCygwin();
            if (process.platform === 'win32' && !cygwin) {
                this.setConfigurationResult();
                resolve();
            }
            else {
                const sourcesInfo = this.parent.getLuaRocksSourcesInfo();
                const details = sourcesInfo.getDetails();
                if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                    const dirUnix = details.getDirPath().getUnixPath();
                    const configureScriptUnix = details.getConfigureScriptPath().getUnixPath();
                    const installDirUnix = details.getInstallDirPath().getUnixPath();
                    executeProcess(details.getBash(), {
                        args: [
                            "-lc",
                            `cd '${dirUnix}' && '${configureScriptUnix}' '--prefix=${installDirUnix}' '--lua-version=${luaShortVersion}' '--with-lua=${installDirUnix}' '--with-lua-interpreter=${interpreter}'`,
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.setConfigurationResult();
                            resolve();
                        })
                        .catch(reject);
                }
                else if (details instanceof LuaRocksUnixSourcesInfoDetails) {
                    const installDir = this.project.getInstallDir();
                    executeProcess(details.getConfigureScript(), {
                        cwd: sourcesInfo.getDir(),
                        args: [
                            `--prefix=${installDir}`,
                            `--lua-version=${luaShortVersion}`,
                            `--with-lua=${installDir}`,
                            `--with-lua-interpreter=${interpreter}`
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.setConfigurationResult();
                            resolve();
                        })
                        .catch(reject);
                }
                else {
                    reject(new Error("Internal error: unexpected LuaRocks sources info details for Unix systems"));
                }
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}