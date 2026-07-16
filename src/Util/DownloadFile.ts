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

import { Readable } from "node:stream";
import { createWriteStream } from "node:fs";
import { setTimeout } from "node:timers/promises";

const DEFAULT_MAX_TRIES = 5;
const DOWNLOAD_MIN_BASE = 1.7;
const DOWNLOAD_MAX_BASE = 2.3;

function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function getWaitingTimeInMilliseconds(retries: number): number {
    let waitingTimeInMilliseconds: number = 0;
    if (retries > 0) {
        const B = randomBetween(DOWNLOAD_MIN_BASE, DOWNLOAD_MAX_BASE);
        const waitingTimeInSeconds = Math.pow(B, retries);
        waitingTimeInMilliseconds = Math.floor(waitingTimeInSeconds * 1000);
    }
    return waitingTimeInMilliseconds;
}

export function downloadFile(url: string | URL, outFile: string, maxTries?: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const tries = (maxTries && maxTries > 0 ? maxTries : DEFAULT_MAX_TRIES) + 1;
        let succeed = false;
        let execErr: any;
        const iter = (i: number) => {
            if (!succeed && i < tries) {
                setTimeout(getWaitingTimeInMilliseconds(i))
                    .then(() => {
                        fetch(url).then(response => {
                            if (!response.ok) {
                                execErr = new Error("Response is not ok");
                                iter(i + 1);
                            }
                            else {
                                const body = response.body;
                                if (body === null) {
                                    execErr = new Error("Response body is null");
                                    iter(i + 1);
                                }
                                else {
                                    Readable.fromWeb(<any>body)
                                        .pipe(createWriteStream(outFile))
                                        .on("error", err => {
                                            execErr = err;
                                            iter(i + 1);
                                        })
                                        .on("finish", () => {
                                            succeed = true;
                                            iter(i + 1);
                                        });
                                }
                            }
                        })
                        .catch(err => {
                            execErr = err;
                            iter(i + 1);
                        });
                    })
                    .catch(timeoutErr => {
                        execErr = timeoutErr;
                        iter(i + 1);
                    });
            }
            else if (succeed) {
                resolve(outFile);
            }
            else if (execErr) {
                reject(execErr);
            }
            else {
                reject(new Error("Download failed"));
            }
        };
        iter(0);
    });
}
