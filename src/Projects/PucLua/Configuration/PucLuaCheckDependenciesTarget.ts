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
import { EOL } from "node:os";
import { mkdtemp, writeFile } from "node:fs/promises";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaFetchTarget } from "./PucLuaFetchTarget";
import { executeProcess } from "../../../Util/ExecuteProcess";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { Console } from "../../../Console";
import { isRunningOnCi } from "../../../Util/CiDetection";

export class PucLuaCheckDependenciesTarget implements ITarget {
    private parent: ITarget | null;
    private project: PucLuaProject;
    constructor(project: PucLuaProject, parent: ITarget | null) {
        this.parent = parent;
        this.project = project;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Check dependencies for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getNext(): ITarget | null {
        return new PucLuaFetchTarget(this.project, this);
    }
    private unixCheckReadline(isRetest: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const githubTryInstallReadline = (errorMsg: string) => {
                if (isRetest) {
                    reject(new Error(errorMsg));
                }
                else if (isRunningOnCi()) {
                    if (process.platform === "darwin") {
                        executeProcess("brew", {
                            args: ["install", "readline"],
                            verbose: true,
                            stdout: defaultStdOutHandler
                        })
                            .then(code => {
                                this.unixCheckReadline(true)
                                    .then(resolve)
                                    .catch(reject);
                            })
                            .catch(reject);
                    }
                    else if (process.platform === "linux") {
                        /* assume Debian-based distro */
                        executeProcess("sudo", {
                            args: ["apt", "install", "-y", "libreadline-dev"],
                            verbose: true,
                            stdout: defaultStdOutHandler
                        })
                            .then(code => {
                                this.unixCheckReadline(true)
                                    .then(resolve)
                                    .catch(reject);
                            })
                            .catch(reject);
                    }
                    else {
                        reject(new Error(errorMsg));
                    }
                }
                else if (process.env["RUNNER_OS"] === "macOS") {
                    executeProcess("brew", {
                        args: ["install", "readline"],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.unixCheckReadline(true)
                                .then(resolve)
                                .catch(reject);
                        })
                        .catch(reject);
                }
                else if (process.env["RUNNER_OS"] === "Linux") {
                    executeProcess("sudo", {
                        args: ["apt", "install", "-y", "libreadline-dev"],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.unixCheckReadline(true)
                                .then(resolve)
                                .catch(reject);
                        })
                        .catch(reject);
                }
                else {
                    reject(new Error(errorMsg));
                }
            };
            const testReadLine: string[] = [
                "#include <stdio.h>",
                "#include <stdlib.h>",
                "#include <readline/readline.h>",
                "int main(int argc, const char **argv) {",
                "\tchar *input = readline(\"enter text > \");",
                "\tif (input) {",
                "\t\tprintf(\"Entered input: %s\\n\", input);",
                "\t\tfree(input);",
                "\t}",
                "\treturn 0;",
                "}"
            ];
            const sourceCode = testReadLine.join(EOL);
            const readlineLibrary = (
                process.platform === 'freebsd' ||
                process.platform === 'netbsd' ||
                process.platform === 'openbsd'
            ) ? "edit" : "readline";
            const testFileBasename = `test-${readlineLibrary}`;
            mkdtemp(join(this.project.getBuildDir(), testFileBasename + "-"))
                .then(tmpDir => {
                    const testFile = join(tmpDir, testFileBasename + ".c");
                    writeFile(testFile, sourceCode, { encoding: "utf-8" })
                        .then(() => {
                            const toolchain = this.project.getToolchain();
                            const compiler = toolchain.getCompiler();
                            compiler.reset();
                            const testOutputObjectFile = join(tmpDir, testFileBasename + compiler.getObjectFileExtension());
                            if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                                compiler.addIncludeDir("/usr/include/edit");
                            }
                            compiler.setInputFile(testFile);
                            compiler.setOutputFile(testOutputObjectFile);
                            compiler.execute()
                                .then(() => {
                                    const readlineProgram = join(tmpDir, testFileBasename);
                                    const linker = toolchain.getLinker();
                                    linker.reset();
                                    linker.addObjectFile(testOutputObjectFile);
                                    linker.addLinkLibrary(readlineLibrary);
                                    linker.setOutputFile(readlineProgram);
                                    linker.execute()
                                        .then(resolve)
                                        .catch(linkErr => {
                                            githubTryInstallReadline(`Failed to link a test program for the ${readlineLibrary} library. Please, install the ${readlineLibrary} library`);
                                        });
                                })
                                .catch(compileErr => {
                                    githubTryInstallReadline(`Failed to compile a test program for the ${readlineLibrary} library. Please, install the ${readlineLibrary} library`);
                                });
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (process.platform === 'win32') {
                resolve();
            }
            else {
                this.unixCheckReadline(false)
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Check dependencies for Lua ${this.project.getVersion().getString()}`);
            resolve();
        });
    }
}