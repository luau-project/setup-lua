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

import { gitClone, GitCloneOptions } from "../../../Util/GitClone";
import { IProject } from "../../IProject";
import { ITarget } from "../ITarget";

export abstract class AbstractGitCloneTarget implements ITarget {
    private url: string | URL;
    private cloneOptions: GitCloneOptions;

    getUrl(): string | URL {
        return this.url;
    }

    getCloneOptions(): GitCloneOptions {
        return this.cloneOptions;
    }

    constructor(url: string | URL, cloneOptions?: GitCloneOptions) {
        this.url = url;
        this.cloneOptions = {};
        this.cloneOptions.ref = cloneOptions?.ref;
        this.cloneOptions.dir = cloneOptions?.dir;
        this.cloneOptions.singleBranch = cloneOptions?.singleBranch;
        this.cloneOptions.verbose = cloneOptions?.verbose;
    }
    abstract init(): Promise<void>;
    abstract getProject(): IProject;
    abstract getParent(): ITarget | null;
    abstract getNext(): ITarget | null;
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            gitClone(this.url, this.cloneOptions)
                .then(code => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(new Error("Failed to clone repository"));
                    }
                })
                .catch(reject);
        });
    }
    abstract finalize(): Promise<void>;
}