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

import { dirname, join } from "node:path";
import { checkFiles } from "./CheckFiles";
import { findGitForWindowsInstallDir } from "./FindGitForWindowsInstallDir";
import { executeProcess, getFirstLineFromProcessExecution } from "./ExecuteProcess";

export interface ExtractTarGzOptions {
    cwd?: string;
    verbose?: boolean;
}

function getWin32TarPath(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const cmdPath = (process.env["COMSPEC"] || "cmd.exe").trim();
        const cmdDir = dirname(cmdPath);
        const tarPath = cmdDir === "." ? "tar.exe" : join(cmdDir, "tar.exe");

        checkFiles([tarPath])
            .then(() => {
                resolve(tarPath);
            })
            .catch(reject);
    });
}

interface GitTargetProgramPath {
    program: string;
    cygpath: string;
}

function getGitTarPath(): Promise<GitTargetProgramPath> {
    return new Promise<GitTargetProgramPath>((resolve, reject) => {
        findGitForWindowsInstallDir()
            .then(gitDir => {
                const tarPath = join(gitDir, "usr", "bin", "tar.exe");
                const cygpath = join(gitDir, "usr", "bin", "cygpath.exe");
                checkFiles([tarPath, cygpath])
                    .then(() => {
                        resolve({
                            program: tarPath,
                            cygpath: cygpath
                        });
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

function win32ExtractTarGz(inputFile: string, opts?: ExtractTarGzOptions): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
        getWin32TarPath()
            .then(win32Tar => {
                executeProcess(
                    win32Tar,
                    {
                        args: opts && opts.cwd ?
                            ["-C", opts.cwd, "-xf", inputFile] :
                            ["-xf", inputFile], verbose: opts?.verbose
                    }
                )
                    .then(resolve)
                    .catch(reject);
            })
            .catch(win32TarErr => {
                getGitTarPath()
                    .then(gitTargetProgram => {
                        getFirstLineFromProcessExecution(
                            gitTargetProgram.cygpath,
                            ["-u", inputFile],
                            opts?.verbose
                        )
                            .then(inputFileUnixPath => {
                                if (opts && opts.cwd) {
                                    getFirstLineFromProcessExecution(
                                        gitTargetProgram.cygpath,
                                        ["-u", opts.cwd],
                                        opts?.verbose
                                    )
                                        .then(cwdUnixPath => {
                                            executeProcess(
                                                gitTargetProgram.program,
                                                {
                                                    args: ["-C", cwdUnixPath, "-xf", inputFileUnixPath],
                                                    verbose: opts?.verbose
                                                }
                                            )
                                                .then(resolve)
                                                .catch(reject);
                                        });
                                }
                                else {
                                    executeProcess(
                                        gitTargetProgram.program,
                                        {
                                            args: ["-xf", inputFileUnixPath],
                                            verbose: opts?.verbose
                                        }
                                    )
                                        .then(resolve)
                                        .catch(reject);
                                }
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            });
    });
}

export function extractTarGz(inputFile: string, opts?: ExtractTarGzOptions): Promise<number | null> {
    return (process.platform === "win32") ?
        win32ExtractTarGz(inputFile, opts) :
        executeProcess(
            "tar",
            {
                args: opts && opts.cwd ?
                    ["-C", opts.cwd, "-xf", inputFile] :
                    ["-xf", inputFile], verbose: opts?.verbose
            }
        );
}