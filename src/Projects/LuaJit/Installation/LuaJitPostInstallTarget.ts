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
import { ITarget } from "../../Targets/ITarget";
import { LuaJitProject } from "../LuaJitProject";
import { AbstractUpdateLuaEnvVarsTarget } from "../../Targets/AbstractUpdateLuaEnvVarsTarget";
import { LuaJitFinishInstallationTarget } from "./LuaJitFinishInstallationTarget";
import { Console } from "../../../Console";
import { LuaInstallation } from "../../ILuaInstallation";
import { getFirstLineFromProcessExecution } from "../../../Util/ExecuteProcess";
import { checkFiles } from "../../../Util/CheckFiles";

export class LuaJitPostInstallTarget extends AbstractUpdateLuaEnvVarsTarget {
    constructor(project: LuaJitProject, parent: ITarget | null) {
        super(project, parent);
    }
    getProjectInstallDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallDir();
    }
    getProjectInstallLibDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallLibDir();
    }
    getProjectInstallBinDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallBinDir();
    }
    getProjectInstallPkgConfigDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallPkgConfigDir();
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = (<LuaJitProject>this.getProject()).getVersion();
            Console.instance().writeLine(`[Start] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return new LuaJitFinishInstallationTarget(<LuaJitProject>this.getProject(), this);
    }
    private setInstallationResult(installDir: string, luaInterpreter: string, luaShortVersion: string): void {
        this.getProject().installationResult().setValue(
            new LuaInstallation(installDir, luaInterpreter, luaShortVersion)
        );
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            super.execute()
                .then(() => {
                    const installDir = this.getProjectInstallDir();
                    const binDir = this.getProjectInstallBinDir();
                    const ext = process.platform === "win32" ? ".exe" : "";
                    const luaInterpreter = join(binDir, `luajit${ext}`);

                    checkFiles([luaInterpreter])
                        .then(() => {
                            getFirstLineFromProcessExecution(luaInterpreter, ["-e", "print(_VERSION:sub(5))"], true)
                                .then(luaShortVersion => {
                                    if (luaShortVersion === "5.1") {
                                        this.setInstallationResult(installDir, luaInterpreter, luaShortVersion);
                                        resolve();
                                    }
                                    else {
                                        reject(new Error("Unexpected LuaJIT / OpenResty short version"));
                                    }
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = (<LuaJitProject>this.getProject()).getVersion();
            Console.instance().writeLine(`[End] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}