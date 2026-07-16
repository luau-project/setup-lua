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
import { executeProcess } from "../../../Util/ExecuteProcess";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaJitUnixBuildInfo } from "../Building/LuaJitUnixBuildInfo";
import { LuaJitProject } from "../LuaJitProject";
import { LuaJitPostInstallTarget } from "./LuaJitPostInstallTarget";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { Console } from "../../../Console";
import { isRunningOnCi } from "../../../Util/CiDetection";

export class LuaJitUnixInstall implements ITarget {
    private project: LuaJitProject;
    private parent: ITarget | null;
    private buildInfo: LuaJitUnixBuildInfo;
    constructor(project: LuaJitProject, parent: ITarget | null, buildInfo: LuaJitUnixBuildInfo) {
        this.project = project;
        this.parent = parent;
        this.buildInfo = buildInfo;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[Start] Install ${projectVersion.getName()} ${projectVersion.getRef()}`);
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
        return new LuaJitPostInstallTarget(this.project, this);
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const makeArguments = this.buildInfo.getMakeArguments();
            const makeArgs = makeArguments.createCopy();
            const installTarget = "install";
            makeArgs.push(installTarget);
            executeProcess(this.buildInfo.getMake(), {
                args: makeArgs,
                stdout: defaultStdOutHandler,
                verbose: true
            })
                .then(makeCode => {
                    if (isRunningOnCi() || process.env["GITHUB_PATH"]) {
                        const installBinDir = this.project.getInstallBinDir()
                        const luajitInterpreter = join(installBinDir, "luajit");
                        const luaSoftLink = join(installBinDir, "lua");
                        executeProcess("ln", {
                            args: ["-s", luajitInterpreter, luaSoftLink],
                            verbose: true,
                            stdout: defaultStdOutHandler
                        })
                            .then(lnCode => {
                                resolve();
                            })
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = this.project.getVersion();
            Console.instance().writeLine(`[End] Install ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}