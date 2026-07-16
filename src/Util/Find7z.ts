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

import { join } from "node:path";
import { windowsRegQuery } from "./WindowsRegQuery";
import { checkFiles } from "./CheckFiles";

function find7zInstallDir(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        windowsRegQuery("HKEY_LOCAL_MACHINE\\SOFTWARE\\7-Zip")
            .then(lines => {
                if (lines.length > 0) {
                    let i = 0;
                    let sevenZipPath: string | undefined = undefined;
                    while (!sevenZipPath && i < lines.length) {
                        const match = /\s*Path\s+REG_SZ\s+(.*)(\r\n|\r|\n)?/i.exec(lines[i]);
                        if (match) {
                            const path = match[1].trim();
                            sevenZipPath = path;
                        }
                        i++;
                    }
                    if (sevenZipPath) {
                        resolve(sevenZipPath);
                    }
                    else {
                        reject(new Error("Unable to find 7-Zip installation path"));
                    }
                }
                else {
                    reject(new Error("7-Zip installation directory was not set"));
                }
            })
            .catch(err => {
                reject(new Error("Unable to query 7-Zip installation path"));
            });
    });
}

export function find7z(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        find7zInstallDir()
            .then(sevenZipInstallDir => {
                const sevenZip = join(sevenZipInstallDir, "7z.exe");
                checkFiles([sevenZip])
                    .then(() => {
                        resolve(sevenZip);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}