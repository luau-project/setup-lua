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
import { PucLuaConfigureSourcesTarget } from "./PucLuaConfigureSourcesTarget";
import { PucLuaSourcesInfo } from "./PucLuaSourcesInfo";
import { Console } from "../../../Console";

export class PucLuaFinishConfigurationTarget implements ITarget {
    private parent: PucLuaConfigureSourcesTarget;
    private project: PucLuaProject;
    constructor(project: PucLuaProject, parent: PucLuaConfigureSourcesTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Finish Lua ${this.project.getVersion().getString()} configuration`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return null;
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const srcInfo = <PucLuaSourcesInfo>this.project.configurationResult().getValue();
            const compat = srcInfo.getCompatFlag();
            if (compat) {
                Console.instance().writeLine(`[Compat] ${compat}`);
            }
            const libSrcFiles = srcInfo.getLibSrcFiles();
            let len = libSrcFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Library] ${libSrcFiles.getItem(i)}`);
            }
            Console.instance().writeLine(`[Header Dir] ${srcInfo.getHeadersDir()}`);
            const headerFiles = srcInfo.getHeaderFiles();
            len = headerFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Header] ${headerFiles.getItem(i)}`);
            }
            const interpreterSrcFiles = srcInfo.getInterpreterSrcFiles();
            len = interpreterSrcFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Interpreter] ${interpreterSrcFiles.getItem(i)}`);
            }
            const compilerFiles = srcInfo.getCompilerSrcFiles();
            len = compilerFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[Compiler] ${compilerFiles.getItem(i)}`);
            }
            const manFiles = srcInfo.getManFiles();
            len = manFiles.getLenght();
            for (let i = 0; i < len; i++) {
                Console.instance().writeLine(`[MAN] ${manFiles.getItem(i)}`);
            }
            resolve();
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Finish Lua ${this.project.getVersion().getString()} configuration`);
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