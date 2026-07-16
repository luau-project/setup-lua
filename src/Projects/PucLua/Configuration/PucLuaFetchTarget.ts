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
import { AbstractFetchTarballTarget } from "../../Targets/Fetch/AbstractFetchTarballTarget";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaApplyPatchesTarget } from "./PucLuaApplyPatchesTarget";
import { PucLuaWorkVersion } from "../PucLuaVersion";
import { Console } from "../../../Console";

export class PucLuaFetchTarget extends AbstractFetchTarballTarget {
    private parent: ITarget | null;
    private project: PucLuaProject;
    constructor(project: PucLuaProject, parent: ITarget | null) {
        super(
            project.getVersion().getDownloadUrl(),
            project.getBuildDir(),
            `lua-${project.getVersion().getString()}`, {
                fileHash: {
                    algorithm: project.getVersion().getHashAlgorithm(),
                    expectedHash: project.getVersion().getHashValue()
                }
            }
        )
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Fetch Lua ${this.project.getVersion().getString()} source code`);
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
        const version = this.project.getVersion();
        let dirName = `lua-${version.getString()}`;
        if (version instanceof PucLuaWorkVersion) {
            const match = /^(lua\-.*)\-rc\d+$/.exec(dirName);
            if (match) {
                dirName = match[1];
            }
        }
        return join(this.getWorkDir(), dirName);
    }
    getNext(): ITarget | null {
        return new PucLuaApplyPatchesTarget(this.project, this);
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Fetch Lua ${this.project.getVersion().getString()} source code`);
            resolve();
        });
    }

}