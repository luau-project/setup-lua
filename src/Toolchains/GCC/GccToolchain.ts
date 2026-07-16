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

import { IArchiver } from "../IArchiver";
import { ICompiler } from "../ICompiler";
import { ILinker } from "../ILinker";
import { IRandomizer } from "../IRandomizer";
import { IStrip } from "../IStrip";
import { GccArchiver } from "./GccArchiver";
import { GccCompiler } from "./GccCompiler";
import { GccLinker } from "./GccLinker";
import { GccRanlib } from "./GccRanlib";
import { GccStrip } from "./GccStrip";
import { IGccLikeToolchain } from "./IGccLikeToolchain";

export class GccToolchain implements IGccLikeToolchain {
    private compiler: GccCompiler;
    private linker: GccLinker;
    private archiver: GccArchiver;
    private ranlib: GccRanlib;
    private strip: GccStrip;

    constructor() {
        this.compiler = new GccCompiler();
        this.linker = new GccLinker();
        this.archiver = new GccArchiver();
        this.ranlib = new GccRanlib();
        this.strip = new GccStrip();
    }
    getCompiler(): ICompiler {
        return this.compiler;
    }
    getLinker(): ILinker {
        return this.linker;
    }
    getArchiver(): IArchiver {
        return this.archiver;
    }
    getRanlib(): IRandomizer {
        return this.ranlib;
    }
    getStrip(): IStrip {
        return this.strip;
    }
}