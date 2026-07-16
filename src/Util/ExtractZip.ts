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

import { mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { executeProcess } from "./ExecuteProcess";
import { findGitForWindowsInstallDir } from "./FindGitForWindowsInstallDir";
import { find7z } from "./Find7z";
import { checkFiles } from "./CheckFiles";

function cscriptUnzip(archive: string, destDir: string): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
        mkdtemp(join(destDir, "unzip-"))
            .then(scriptDir => {
                const unzipScript: string[] = [
                    "function print(value) { WScript.Echo(value); }",
                    "function exit(value) { WScript.Quit(value); }",
                    "var argv = WScript.Arguments;",
                    "var shell = new ActiveXObject('shell.application');",
                    "var fs = new ActiveXObject('scripting.filesystemobject');",
                    "var archive = argv.Named('archive');",
                    "if (!archive) { print('archive not set'); exit(1); }",
                    "if (!fs.FileExists(archive)) { print('archive not found'); exit(1); }",
                    "if (archive.length < 4 || archive.substring(archive.length - 4) !== '.zip') { print('archive is not a .zip'); exit(1); }",
                    "var destDir = argv.Named('destdir');",
                    "if (!destDir) { print('destination directory not set'); exit(1); }",
                    "if (!fs.FolderExists(destDir)) { fs.CreateFolder(destDir); }",
                    "var shZip = shell.NameSpace(archive);",
                    "var shDestDir = shell.NameSpace(destDir);",
                    "shDestDir.CopyHere(shZip.Items(), 16 | 256);"
                ];
                const scriptContent = unzipScript.join(" ");
                const unzipJs = join(scriptDir, "unzip.js");
                writeFile(unzipJs, scriptContent)
                    .then(() => {
                        executeProcess("cscript", {
                            args: [
                                unzipJs,
                                "/nologo",
                                "/e:JScript",
                                `/archive:${archive}`,
                                `/destdir:${destDir}`
                            ],
                            verbose: true
                        })
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

function powershellExpandArchive(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const programs: string[] = ["powershell", "pwsh"];
        const len = programs.length;
        const program_iter = (i: number) => {
            if (i < len) {
                const powershell = programs[i];
                executeProcess(powershell, {
                    args: ["-Command", "Get-Command Expand-Archive"],
                })
                    .then(code => {
                        resolve(powershell);
                    })
                    .catch(() => {
                        program_iter(i + 1);
                    });
            }
            else {
                reject(new Error("Unable to find a powershell instance capable of extracting zip files."));
            }
        };
        program_iter(0);
    });
}

function findGitUnzipPath(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        findGitForWindowsInstallDir()
            .then(gitInstallDir => {
                const gitUnzip = join(gitInstallDir, "usr", "bin", "unzip.exe");
                checkFiles([gitUnzip])
                    .then(() => {
                        resolve(gitUnzip);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

export interface ExtractZipOptions {
    cwd?: string;
    verbose?: boolean;
}

export function extractZip(path: string, opts?: ExtractZipOptions): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
        const dir = opts && opts.cwd ? opts.cwd : process.cwd();
        if (process.platform === 'win32') {
            cscriptUnzip(path, dir)
                .then(resolve)
                .catch(cscriptErr => {
                    powershellExpandArchive()
                        .then(powershell => {
                            executeProcess(powershell, { args: [
                                "-Command",
                                `\$ProgressPreference = 'SilentlyContinue'; Expand-Archive -Path '${path.replace(/'/g, "''")}' -DestinationPath '${dir.replace(/'/g, "''")}'`
                            ], verbose: opts?.verbose })
                                .then(code => {
                                    resolve(code);
                                })
                                .catch(reject);
                        })
                        .catch(powershellErr => {
                            findGitUnzipPath()
                                .then(gitUnzip => {
                                    executeProcess(gitUnzip, { cwd: dir, args: [path.replace(/\\/g, "/")], verbose: opts?.verbose })
                                        .then(code => {
                                            resolve(code);
                                        })
                                        .catch(reject);
                                })
                                .catch(gitUnzipErr => {
                                    find7z()
                                        .then(sevenZip => {
                                            executeProcess(sevenZip, { args: ["-aoa", `-o${dir}`, "x", path], verbose: opts?.verbose })
                                                .then(code => {
                                                    resolve(code);
                                                })
                                                .catch(reject);
                                        })
                                        .catch(sevenZipErr => {
                                            reject(new Error("You must install the latest PowerShell, Git For Windows or 7-Zip to unzip files"));
                                        });
                                });
                        });
                });
        }
        else {
            executeProcess("unzip", { cwd: dir, args: [path] })
                .then(code => {
                    resolve(code);
                })
                .catch(reject);
        }
    });
}