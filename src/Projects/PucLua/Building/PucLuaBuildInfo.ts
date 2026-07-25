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

import { IReadOnlyArray } from "../../../Util/IReadOnlyArray";
import { ReadOnlyArray } from "../../../Util/ReadOnlyArray";
import { PucLuaSourcesInfo } from "../Configuration/PucLuaSourcesInfo";

export class PucLuaBuildInfo {
    private sourcesInfo: PucLuaSourcesInfo;
    private sharedLibrary: string;
    private staticLibrary: string;
    private interpreter: string;
    private compiler: string;
    private pkgConfigFiles: IReadOnlyArray<string>;
    private importLibrary: string | undefined;
    constructor(
        sourcesInfo: PucLuaSourcesInfo,
        sharedLibrary: string,
        staticLibrary: string,
        interpreter: string,
        compiler: string,
        pkgConfigFiles: string[],
        importLibrary: string | undefined
    ) {
        this.sourcesInfo = sourcesInfo;
        this.sharedLibrary = sharedLibrary;
        this.staticLibrary = staticLibrary;
        this.interpreter = interpreter;
        this.compiler = compiler;
        this.pkgConfigFiles = new ReadOnlyArray<string>(pkgConfigFiles);
        this.importLibrary = importLibrary;
    }
    getSourcesInfo(): PucLuaSourcesInfo {
        return this.sourcesInfo;
    }
    getSharedLibrary(): string {
        return this.sharedLibrary;
    }
    getStaticLibrary(): string {
        return this.staticLibrary;
    }
    getInterpreter(): string {
        return this.interpreter;
    }
    getCompiler(): string {
        return this.compiler;
    }
    getPkgConfigFiles(): IReadOnlyArray<string> {
        return this.pkgConfigFiles;
    }
    getImportLibrary(): string | undefined {
        return this.importLibrary;
    }
}