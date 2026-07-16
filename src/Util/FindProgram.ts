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

import { getStdOutFromProcessExecution } from "./ExecuteProcess";

export function findProgram(program: string, verbose?: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (process.platform === 'win32') {
            getStdOutFromProcessExecution((process.env["COMSPEC"] || "cmd").trim(), {
                args: ["/C", "where", program],
                verbose: verbose
            })
                .then(result => {
                    const lines = result.lines;
                    if (lines.length > 0) {
                        resolve(lines[0]);
                    }
                    else {
                        reject(new Error("Internal error: the expected program path was not found."));
                    }
                })
                .catch(err => {
                    reject(new Error(`Unable to find ${program}`));
                });
        }
        else {
            getStdOutFromProcessExecution("which", {
                args: [program],
                verbose: verbose
            })
                .then(result => {
                    const lines = result.lines;
                    if (lines.length > 0) {
                        resolve(lines[0]);
                    }
                    else {
                        reject(new Error("Internal error: the expected program path was not found."));
                    }
                })
                .catch(err => {
                    reject(new Error(`Unable to find ${program}`));
                });
        }
    });
}