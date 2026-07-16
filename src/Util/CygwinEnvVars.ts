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
import { appendFile } from "node:fs/promises";
import { getCygpathFromCygwin } from "./CygwinPath";
import { getFirstLineFromProcessExecution } from "./ExecuteProcess";
import { sequentialPromises } from "./SequentialPromises";

function getCygwinProfilePath(baseDir: string): string {
    return join(baseDir, "etc", "profile.d", "setup-lua.sh");
}

function coreExportEnvVarOnCygwinFile(filepath: string, key: string, value: string, isRawVar: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        appendFile(filepath, [
            isRawVar ? `${key}='${value}'` : `${key}='${value}'":\${${key}}";`,
            `export ${key};`,
            ""
            ].join("\n"),
            { encoding: "utf-8" }
        )
            .then(resolve)
            .catch(reject);
    });
}

export function exportLuaEnvVarsOnCygwinProfile(pkgConfigPath: string, cmakePrefixPath: string, binDir: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
                sequentialPromises<string>([
                    () => getFirstLineFromProcessExecution(cygPath, [ "-w", "/" ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", pkgConfigPath ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", cmakePrefixPath ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-u", binDir ], true)
                ])
                    .then(paths => {
                        const profile = getCygwinProfilePath(paths[0]);

                        sequentialPromises<void>([
                            () => coreExportEnvVarOnCygwinFile(profile, "PKG_CONFIG_PATH", paths[1], false),
                            () => coreExportEnvVarOnCygwinFile(profile, "CMAKE_PREFIX_PATH", paths[2], false),
                            () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[3], false)
                        ]).then(() => {
                            resolve()
                        })
                        .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

export function exportLuaRocksEnvVarsOnCygwinProfile(luaPath: string, luaCPath: string, luaRocksBinPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
                sequentialPromises<string>([
                    () => getFirstLineFromProcessExecution(cygPath, [ "-w", "/" ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", luaRocksBinPath ], true)
                ])
                    .then(paths => {
                        const profile = getCygwinProfilePath(paths[0]);

                        sequentialPromises<void>([
                            () => coreExportEnvVarOnCygwinFile(profile, "LUA_PATH", luaPath, true),
                            () => coreExportEnvVarOnCygwinFile(profile, "LUA_CPATH", luaCPath, true),
                            () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[1], false)
                        ]).then(_values => {
                            resolve()
                        })
                        .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}