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

import { stat } from "node:fs/promises";

export function checkFiles(files: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const len = files.length;

        const file_iter = (i: number) => {
            if (i < len) {
                const f = files[i];
                stat(f)
                    .then(s => {
                        if (s.isFile()) {
                            file_iter(i + 1);
                        }
                        else {
                            reject(new Error(`${f} is not a file`));
                        }
                    })
                    .catch(err => {
                        if (err.code === 'ENOENT') {
                            reject(new Error(`The expected file \`${f}' was not found`));
                        }
                        else {
                            reject(err);
                        }
                    });
            }
            else {
                resolve();
            }
        };

        file_iter(0);
    });
}