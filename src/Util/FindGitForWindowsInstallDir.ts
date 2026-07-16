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

import { windowsRegQuery } from "./WindowsRegQuery";

export function findGitForWindowsInstallDir(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        windowsRegQuery("HKEY_LOCAL_MACHINE\\SOFTWARE\\GitForWindows")
            .then(lines => {
                if (lines.length > 0) {
                    let i = 0;
                    let gitInstallDir: string | undefined = undefined;
                    while (!gitInstallDir && i < lines.length) {
                        const match = /\s*InstallPath\s+REG_SZ\s+(.*)(\r\n|\r|\n)?/i.exec(lines[i]);
                        if (match) {
                            const path = match[1].trim();
                            gitInstallDir = path;
                        }
                        i++;
                    }
                    if (gitInstallDir) {
                        resolve(gitInstallDir);
                    }
                    else {
                        reject(new Error("Unable to find Git For Windows installation patch"));
                    }
                }
                else {
                    reject(new Error("Git For Windows installation directory was not set"));
                }
            })
            .catch(err => {
                reject(new Error("Unable to query Git For Windows installation path"));
            });
    });
}