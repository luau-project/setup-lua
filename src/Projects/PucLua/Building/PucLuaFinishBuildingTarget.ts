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

import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaBuildInfo } from "./PucLuaBuildInfo";
import { PucLuaCreatePkgConfigTarget } from "./PucLuaCreatePkgConfigTarget";
import { Console } from "../../../Console";

export class PucLuaFinishBuildingTarget implements ITarget {
    private parent: PucLuaCreatePkgConfigTarget;
    private project: PucLuaProject;
    constructor(project: PucLuaProject, parent: PucLuaCreatePkgConfigTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish the build of Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return null;
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const buildInfo = <PucLuaBuildInfo>this.project.buildResult().getValue();
            Console.instance().writeLine(`Shared Library: ${buildInfo.getSharedLibrary()}`);
            Console.instance().writeLine(`Static Library: ${buildInfo.getStaticLibrary()}`);
            Console.instance().writeLine(`Interpreter: ${buildInfo.getInterpreter()}`);
            Console.instance().writeLine(`Compiler: ${buildInfo.getCompiler()}`);
            Console.instance().writeLine(`PkgConfig: ${buildInfo.getPkgConfigFile()}`);
            const impLib = buildInfo.getImportLibrary();
            if (impLib) {
                Console.instance().writeLine(`Import Library: ${impLib}`);
            }
            resolve();
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish the build of Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
}