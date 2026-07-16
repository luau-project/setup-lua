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

import { spawn } from "node:child_process";
import { Console } from "../Console";

export interface ExecProcessInfo {
    cwd?: string | URL | undefined;
    args?: string[];
    verbose?: boolean;
    stdout?: (chunk: any) => void;
    stderr?: (err: any) => void;
}

export function executeProcess(tool: string, opts?: ExecProcessInfo): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
        const spawnOpts = { cwd: opts?.cwd };
        const p = (opts && opts.args) ? spawn(tool, opts.args, spawnOpts) : spawn(tool, spawnOpts);

        if (opts && opts.args && opts.verbose) {
            const values = [`"${tool}"`];
            for (const a of opts.args) {
                values.push(`"${a.replace(/"/g,"\\\"")}"`);
            }
            Console.instance().writeLine(values.join(" "));
        }

        if (opts && opts.stdout) {
            p.stdout.on("data", opts.stdout);
        }
        if (opts && opts.stderr) {
            p.stderr.on("data", opts.stderr);
        }
        p.on("close", code => {
            if (code === 0) {
                resolve(code);
            }
            else {
                reject(code);
            }
        });
        p.on("error", err => {
            reject(err);
        })
    });
}

export interface StdOutFromProcessExecInfo {
    cwd?: string | URL | undefined;
    args?: string[];
    verbose?: boolean;
    stderr?: (err: any) => void;
}

export interface StdOutFromProcessExecResult {
    code: number | null;
    lines: string[];
}

export function getStdOutFromProcessExecution(tool: string, opts?: StdOutFromProcessExecInfo): Promise<StdOutFromProcessExecResult> {
    return new Promise<StdOutFromProcessExecResult>((resolve, reject) => {
        const spawnOpts = { cwd: opts?.cwd };
        const p = (opts && opts.args) ? spawn(tool, opts.args, spawnOpts) : spawn(tool, spawnOpts);
        const stdOutput: string[] = [];

        if (opts && opts.args && opts.verbose) {
            const values = [`"${tool}"`];
            for (const a of opts.args) {
                values.push(`"${a.replace(/"/g,"\\\"")}"`);
            }
            Console.instance().writeLine(values.join(" "));
        }
        p.stdout.on("data", (chunk: any) => {
            stdOutput.push(<string>(chunk.toString()));
        });
        if (opts && opts.stderr) {
            p.stderr.on("data", opts.stderr);
        }
        p.on("close", code => {
            if (code === 0) {
                resolve({ code: code, lines: stdOutput.join('').split(/\r\n|\r|\n/) });
            }
            else {
                reject(code);
            }
        });
        p.on("error", err => {
            reject(err);
        })
    });
}

export function getFirstLineFromProcessExecution(tool: string, args: string[], verbose?: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        getStdOutFromProcessExecution(tool, { args: args, verbose: verbose })
            .then(result => {
                resolve(result.lines[0]);
            })
            .catch(reject);
    });
}