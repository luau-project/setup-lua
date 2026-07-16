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

import { mkdir, stat } from "fs/promises";
import { ReadOnlyArray } from "../../Util/ReadOnlyArray";
import { ITarget } from "./ITarget";
import { IProject } from "../IProject";
import { IReadOnlyArray } from "../../Util/IReadOnlyArray";

export abstract class AbstractCreateDirectoriesTarget implements ITarget {
    private directories: IReadOnlyArray<string>;

    constructor(dirs: string[]) {
        this.directories = new ReadOnlyArray<string>(dirs);
    }
    abstract init(): Promise<void>;
    abstract finalize(): Promise<void>;
    abstract getProject(): IProject;
    abstract getParent(): ITarget | null;
    abstract getNext(): ITarget | null;

    getDirectories(): IReadOnlyArray<string> {
        return this.directories;
    }

    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const len = this.directories.getLenght();

            const dir_iter = (i: number) => {
                if (i < len) {
                    const dir = this.directories.getItem(i);
                    stat(dir)
                        .then(s => {
                            if (s.isDirectory()) {
                                dir_iter(i + 1);
                            }
                            else {
                                reject(new Error("The chosen path is already on disk, but it is not a directory"));
                            }
                        })
                        .catch(() => {
                            mkdir(dir, { recursive: true })
                                .then(() => {
                                    dir_iter(i + 1);
                                })
                                .catch(reject);
                        });
                }
                else {
                    resolve();
                }
            };

            dir_iter(0);
        });
    }
}