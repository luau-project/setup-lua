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

import { createHash } from "node:crypto";
import { createReadStream, PathLike } from "node:fs";
import { Writable } from "node:stream";

export function getFileHash(file: PathLike, algorithm: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const hashOutput: string[] = [];
        const hashOutputStream = new Writable({
            write(chunk, encoding, callback) {
                hashOutput.push(chunk.toString());
                callback();
            }
        });

        createReadStream(file)
            .pipe(createHash(algorithm))
            .setEncoding("hex")
            .pipe(hashOutputStream)
            .on("close", () => {
                resolve(hashOutput.join(""));
            })
            .on("error", reject);
    });
}

export function verifyFileHash(file: PathLike, algorithm: string, expectedHash: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        getFileHash(file, algorithm)
            .then(value => {
                resolve(expectedHash.toLowerCase() == value)
            })
            .catch(reject);
    });
}