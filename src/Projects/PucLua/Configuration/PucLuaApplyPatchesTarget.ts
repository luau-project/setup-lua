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
import { ToolchainEnvironmentVariables } from "../../../Toolchains/ToolchainEnvironmentVariables";
import { AbstractApplyPatchesTarget } from "../../Targets/AbstractApplyPatchesTarget";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaConfigureSourcesTarget } from "./PucLuaConfigureSourcesTarget";
import { PucLuaFetchTarget } from "./PucLuaFetchTarget";
import { Console } from "../../../Console";
import { isCygwin } from "../../../Util/CygwinDetection";
import { IPucLuaVersion, LUA_53_VERSION } from "../PucLuaVersion";
import { checkFiles } from "../../../Util/CheckFiles";
import { replaceFirstInFile } from "../../../Util/ReplaceInFile";

export class PucLuaApplyPatchesTarget extends AbstractApplyPatchesTarget {
    constructor(project: PucLuaProject, parent: PucLuaFetchTarget) {
        super(project, parent, parent.getExtractedDir(), project.getRemotePatchesBuildDir(), ToolchainEnvironmentVariables.instance().getLuaPatches());
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Apply patches on Lua ${(<PucLuaProject>this.getProject()).getVersion().getString()}`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return new PucLuaConfigureSourcesTarget((<PucLuaProject>this.getProject()), this);
    }
    private patchLuaConf(luaConfPath: string, version: IPucLuaVersion): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const luaABI = `${version.getMajor()}.${version.getMinor()}`;
            const targetStr = [
                "#define LUA_LDIR\t\"!\\\\lua\\\\\"",
                "#define LUA_CDIR\t\"!\\\\\""
            ].join("\n");
            const replacementStr = [
                `#define LUA_LDIR\t\"!\\\\..\\\\share\\\\lua\\\\${luaABI}\"`,
                `#define LUA_CDIR\t\"!\\\\..\\\\lib\\\\lua\\\\${luaABI}\"`
            ].join("\n");
            replaceFirstInFile(luaConfPath, 0, targetStr, replacementStr)
                .then(resolve)
                .catch(reject);
        });
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const project = <PucLuaProject>this.getProject();
            const version = project.getVersion();
            if (process.platform === "win32" && version.compareTo(LUA_53_VERSION) < 0 && isCygwin()) {
                const parent = <PucLuaFetchTarget>(this.getParent());
                const luaconf = join(parent.getExtractedDir(), "src", "luaconf.h");
                checkFiles([luaconf])
                    .then(() => {
                        this.patchLuaConf(luaconf, version)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject);
            }
            else {
                super.execute()
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Apply patches on Lua ${(<PucLuaProject>this.getProject()).getVersion().getString()}`);
            resolve();
        });
    }
}