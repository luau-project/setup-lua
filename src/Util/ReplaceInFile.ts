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

import { readFile, writeFile } from "node:fs/promises";
import { replaceAll } from "./StringReplaceAll";

interface ReplacementCallback {
    (input: string, targetStr: string, replacementStr: string): string;
}

function replaceFirst(input: string, targetStr: string, replacementStr: string): string {
    return input.replace(targetStr, replacementStr);
}

function replacementInFile(
    callback: ReplacementCallback,
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        readFile(filePath, { encoding: encoding })
            .then(content => {
                if (numberOfLinesToSkip === 0) {
                    const newContent = callback(content.toString(), targetStr, replacementStr);
                    writeFile(filePath, newContent, { encoding: encoding })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    const s = content.toString();
                    const rgx = /\r?\n/g;
                    let match: RegExpExecArray | null;
                    let foundStart: boolean = false;

                    let i: number = 0;
                    let index: number = 0;
                    while (!foundStart && (match = rgx.exec(s)) != null) {
                        index = match.index + match[0].length;
                        i++;
                        foundStart = i == numberOfLinesToSkip;
                    }

                    if (foundStart) {
                        const newContent = s.substring(0, index) + callback(s.substring(index), targetStr, replacementStr);
                        writeFile(filePath, newContent, { encoding: encoding })
                            .then(resolve)
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                }
            })
            .catch(reject);
    });
}

export function replaceFirstInFile(
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return replacementInFile(replaceFirst, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}

export function replaceAllInFile(
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return replacementInFile(replaceAll, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}