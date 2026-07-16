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
import { ILuaJitVersion } from "../LuaJitVersion";

export class LuaJitSourcesInfo {
    private dir: string;
    private srcDir: string;
    private version: ILuaJitVersion;
    private unixMakefile: string;
    private mingwMakefile: string;
    private msvcBuildBat: string;
    private delayedHeaderFile: string;
    private headerFiles: IReadOnlyArray<string>;
    private manFiles: IReadOnlyArray<string>;
    private jitFiles: IReadOnlyArray<string>;

    constructor(dir: string, srcDir: string, version: ILuaJitVersion, unixMakefile: string, mingwMakefile: string, msvcBuildBat: string, delayedHeaderFile: string, headerFiles: string[], manFiles: string[], jitFiles: string[]) {
        this.dir = dir;
        this.srcDir = srcDir;
        this.version = version;
        this.unixMakefile = unixMakefile;
        this.mingwMakefile = mingwMakefile;
        this.msvcBuildBat = msvcBuildBat;
        this.delayedHeaderFile = delayedHeaderFile;
        this.headerFiles = new ReadOnlyArray<string>(headerFiles);
        this.manFiles = new ReadOnlyArray<string>(manFiles);
        this.jitFiles = new ReadOnlyArray<string>(jitFiles);
    }

    getDir(): string {
        return this.dir;
    }

    getSrcDir(): string {
        return this.srcDir;
    }

    getVersion(): ILuaJitVersion {
        return this.version;
    }

    getUnixMakefile(): string {
        return this.unixMakefile;
    }

    getMingwMakefile(): string {
        return this.mingwMakefile;
    }

    getMsvcBuildBat(): string {
        return this.msvcBuildBat;
    }

    getDelayedHeaderFile(): string {
        return this.delayedHeaderFile;
    }

    getHeaderFiles(): IReadOnlyArray<string> {
        return this.headerFiles;
    }

    getManFiles(): IReadOnlyArray<string> {
        return this.manFiles;
    }

    getJitFiles(): IReadOnlyArray<string> {
        return this.jitFiles;
    }
}