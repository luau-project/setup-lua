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

export class PucLuaSourcesInfo {
    private compatFlag?: string;
    private headersDir: string;
    private headerFiles: IReadOnlyArray<string>;
    private manFiles: IReadOnlyArray<string>;
    private libSrcFiles: IReadOnlyArray<string>;
    private interpreterSrcFiles: IReadOnlyArray<string>;
    private compilerSrcFiles: IReadOnlyArray<string>;

    constructor(headersDir: string, headerFiles: string[], manFiles: string[], libSrcFiles: string[], interpreterSrcFiles: string[], compilerSrcFiles: string[], compatFlag?: string) {
        this.headersDir = headersDir;
        this.headerFiles = new ReadOnlyArray<string>(headerFiles);
        this.manFiles = new ReadOnlyArray<string>(manFiles);
        this.libSrcFiles = new ReadOnlyArray<string>(libSrcFiles);
        this.interpreterSrcFiles = new ReadOnlyArray<string>(interpreterSrcFiles);
        this.compilerSrcFiles = new ReadOnlyArray<string>(compilerSrcFiles);
        this.compatFlag = compatFlag;
    }

    getCompatFlag(): string | undefined {
        return this.compatFlag;
    }

    getHeadersDir(): string {
        return this.headersDir;
    }

    getHeaderFiles(): IReadOnlyArray<string> {
        return this.headerFiles;
    }

    getManFiles(): IReadOnlyArray<string> {
        return this.manFiles;
    }

    getLibSrcFiles(): IReadOnlyArray<string> {
        return this.libSrcFiles;
    }

    getInterpreterSrcFiles(): IReadOnlyArray<string> {
        return this.interpreterSrcFiles;
    }

    getCompilerSrcFiles(): IReadOnlyArray<string> {
        return this.compilerSrcFiles;
    }
}
