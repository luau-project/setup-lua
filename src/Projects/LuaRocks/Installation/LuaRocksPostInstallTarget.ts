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

import { basename, dirname, join } from "node:path";
import { readdir, stat } from "node:fs/promises";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { executeProcess, getFirstLineFromProcessExecution } from "../../../Util/ExecuteProcess";
import { checkFiles } from "../../../Util/CheckFiles";
import { LuaRocksInstallTarget } from "./LuaRocksInstallTarget";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksWindowsSourcesInfoDetails } from "../Configuration/LuaRocksSourcesInfo";
import { appendToGitHubEnvironmentVariables, appendToGitHubPath } from "../../../Util/GitHub";
import { ToolchainEnvironmentVariables } from "../../../Toolchains/ToolchainEnvironmentVariables";
import { sequentialPromises } from "../../../Util/SequentialPromises";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { isGccLikeToolchain } from "../../../Toolchains/GCC/IGccLikeToolchain";
import { LuaRocksFinishInstallationTarget } from "./LuaRocksFinishInstallationTarget";
import { Console } from "../../../Console";
import { isCygwinOnCI } from "../../../Util/CygwinDetection";
import { exportLuaRocksEnvVarsOnCygwinProfile } from "../../../Util/CygwinEnvVars";
import { replaceAllInFile } from "../../../Util/ReplaceInFile";
import { LuaRocksInstallation } from "../../ILuaRocksInstallation";

interface EnvVar {
    key: string;
    value: string;
}

interface ReplacementInFile {
    filepath: string;
    linesToSkip: number;
}

export class LuaRocksPostInstallTarget implements ITarget {
    private parent: LuaRocksInstallTarget;
    private project: LuaRocksProject;
    constructor(project: LuaRocksProject, parent: LuaRocksInstallTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Post install for LuaRocks ${this.project.getVersion().getIdentifier()}`);
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
        return new LuaRocksFinishInstallationTarget(this.project, this);
    }
    private setCygwinEnvironmentVariablesOnGitHub(bash: string, luaRocksUnix: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            sequentialPromises<string>([
                () => getFirstLineFromProcessExecution(bash, [ "-lc", `'${luaRocksUnix}' path --lr-bin` ], true),
                () => getFirstLineFromProcessExecution(bash, [ "-lc", `'${luaRocksUnix}' path --lr-cpath` ], true),
                () => getFirstLineFromProcessExecution(bash, [ "-lc", `'${luaRocksUnix}' path --lr-path` ], true)
            ])
                .then(values => {
                    const lrBinPath = values[0];
                    /*
                    ** Quoted from Roberto's PIL, second edition, page 140:
                    **   https://www.inf.puc-rio.br/~roberto/pil2/chapter15.pdf
                    **
                    ** > When Lua starts, it initializes this variable with
                    ** > the value of the environment variable LUA_PATH or with
                    ** > a compiled-defined default path, if this environment
                    ** > variable is not defined. When using LUA_PATH, Lua
                    ** > substitutes the default path for any substring ";;".
                    ** > For instance, if you set LUA_PATH to "mydir/?.lua;;",
                    ** > the final path will be the component "mydir/?.lua"
                    ** > followed by the default path.
                    */
                    const lrCPath = values[1] + ";;";
                    const lrPath = values[2] + ";;";

                    sequentialPromises<void>([
                        () => appendToGitHubEnvironmentVariables("LUA_PATH", lrPath),
                        () => appendToGitHubEnvironmentVariables("LUA_CPATH", lrCPath),
                        () => appendToGitHubPath(lrBinPath)
                    ])
                        .then(_values => {
                            if (isCygwinOnCI()) {
                                /* we are on a GitHub action inside MSYS2 */
                                exportLuaRocksEnvVarsOnCygwinProfile(lrPath, lrCPath, lrBinPath)
                                    .then(resolve)
                                    .catch(reject);
                            }
                            else {
                                resolve();
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    private setEnvironmentVariablesOnGitHub(luarocks: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            sequentialPromises<string>([
                () => getFirstLineFromProcessExecution(luarocks, [ "path", "--lr-bin" ], true),
                () => getFirstLineFromProcessExecution(luarocks, [ "path", "--lr-cpath" ], true),
                () => getFirstLineFromProcessExecution(luarocks, [ "path", "--lr-path" ], true)
            ])
                .then(values => {
                    const lrBinPath = values[0];
                    /*
                    ** Quoted from Roberto's PIL, second edition, page 140:
                    **   https://www.inf.puc-rio.br/~roberto/pil2/chapter15.pdf
                    **
                    ** > When Lua starts, it initializes this variable with
                    ** > the value of the environment variable LUA_PATH or with
                    ** > a compiled-defined default path, if this environment
                    ** > variable is not defined. When using LUA_PATH, Lua
                    ** > substitutes the default path for any substring ";;".
                    ** > For instance, if you set LUA_PATH to "mydir/?.lua;;",
                    ** > the final path will be the component "mydir/?.lua"
                    ** > followed by the default path.
                    */
                    const lrCPath = values[1] + ";;";
                    const lrPath = values[2] + ";;";

                    sequentialPromises<void>([
                        () => appendToGitHubEnvironmentVariables("LUA_PATH", lrPath),
                        () => appendToGitHubEnvironmentVariables("LUA_CPATH", lrCPath),
                        () => appendToGitHubPath(lrBinPath)
                    ])
                        .then(_values => {
                            if (isCygwinOnCI()) {
                                /* we are on a GitHub action inside MSYS2 */
                                exportLuaRocksEnvVarsOnCygwinProfile(lrPath, lrCPath, lrBinPath)
                                    .then(resolve)
                                    .catch(reject);
                            }
                            else {
                                resolve();
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    private setCygwinLuaRocksConfig(bash: string, luaRocksUnix: string, key: string, value: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            executeProcess(bash, {
                args: [
                    "-lc", `'${luaRocksUnix}' config '${key}' '${value}'`
                ],
                verbose: true,
                stdout: defaultStdOutHandler
            })
                .then(_configSetEnvVar => {
                    resolve();
                })
                .catch(reject);
        });
    }
    private setLuaRocksConfig(luarocks: string, key: string, value: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            executeProcess(luarocks, {
                args: [
                    "config",
                    key,
                    value
                ],
                verbose: true,
                stdout: defaultStdOutHandler
            })
                .then(_configSetEnvVar => {
                    resolve();
                })
                .catch(reject);
        });
    }
    private setCygwinLuaRocksConfigVariable(bash: string, luaRocksUnix: string, key: string, value: string): Promise<void> {
        return this.setCygwinLuaRocksConfig(bash, luaRocksUnix, `variables.${key}`, value);
    }
    private setLuaRocksConfigVariable(luarocks: string, key: string, value: string): Promise<void> {
        return this.setLuaRocksConfig(luarocks, `variables.${key}`, value);
    }
    private setCygwinLuaRocksToolchainEnvVars(bash: string, luaRocksUnix: string, toolchainEnvVars: EnvVar[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const iter = (i: number) => {
                if (i < toolchainEnvVars.length) {
                    const envVar = toolchainEnvVars[i];
                    this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, envVar.key, envVar.value)
                        .then(() => {
                            iter(i + 1);
                        })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            iter(0);
        });
    }
    private setLuaRocksToolchainEnvVars(luarocks: string, toolchainEnvVars: EnvVar[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const iter = (i: number) => {
                if (i < toolchainEnvVars.length) {
                    const envVar = toolchainEnvVars[i];
                    this.setLuaRocksConfigVariable(luarocks, envVar.key, envVar.value)
                        .then(() => {
                            iter(i + 1);
                        })
                        .catch(reject);
                }
                else {
                    resolve();
                }
            };
            iter(0);
        });
    }
    private setLuaRocksConfigSetupOnWindows(luarocks: string, luaVersion: string, installDir: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            sequentialPromises<void>([
                () => this.setLuaRocksConfig(luarocks, "lua_version", luaVersion),
                () => this.setLuaRocksConfig(luarocks, "lua_dir", installDir),
            ])
                .then(_values => {
                    resolve();
                })
                .catch(reject);
        });
    }
    private getWindowsGccExternalDepsDirs(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const maxDepth: number = 10;
            const matchFile = (dir: string, depth: number, predicate: (filename: string) => boolean) => {
                return new Promise<string>((_resolve, _reject) => {
                    if (depth > maxDepth) {
                        _reject(new Error(`Not searching further than ${maxDepth} directories deep`));
                    }
                    else {
                        readdir(dir)
                            .then(files => {
                                const file_iter = (i: number) => {
                                    if (i < files.length) {
                                        const fileBasename = files[i];
                                        const file = join(dir, fileBasename);
                                        stat(file)
                                            .then(fileStat => {
                                                if (fileStat.isFile() && predicate(file)) {
                                                    _resolve(file);
                                                }
                                                else if (fileStat.isDirectory()) {
                                                    matchFile(file, depth + 1, predicate)
                                                        .then(_resolve)
                                                        .catch(matchErr => {
                                                            file_iter(i + 1);
                                                        });
                                                }
                                                else {
                                                    file_iter(i + 1);
                                                }
                                            })
                                            .catch(fileStatErr => {
                                                file_iter(i + 1);
                                            });
                                    }
                                    else {
                                        _reject(new Error("Match not found"));
                                    }
                                };
    
                                file_iter(0);
                            })
                            .catch(_reject);
                    }
                });
            };
            const externalDepsDirs: string[] = [];
            const systemDrive = process.env["SYSTEMDRIVE"];
            if (systemDrive) {
                const systemDriveTrimmed = systemDrive.trim();
                if (systemDriveTrimmed.toLowerCase() !== "c:") {
                    externalDepsDirs.push(join(systemDriveTrimmed, "external"));
                }
            }
            externalDepsDirs.push(join("C:", "external"));
            getFirstLineFromProcessExecution("where", [ToolchainEnvironmentVariables.instance().getCC()], true)
                .then(ccPath => {
                    const ccBinDir = dirname(ccPath);
                    if (basename(ccBinDir).toLowerCase() === 'bin') {
                        const ccDir = dirname(ccBinDir);
                        const ccInclude = join(ccDir, "include");
                        stat(ccInclude)
                            .then(ccIncludeStat => {
                                if (ccIncludeStat.isDirectory()) {
                                    externalDepsDirs.push(ccDir);
                                    getFirstLineFromProcessExecution(ToolchainEnvironmentVariables.instance().getCC(), ["-dumpmachine"])
                                        .then(dumpMachine => {
                                            matchFile(ccDir, 0, file => basename(file).toLowerCase() === 'windows.h')
                                                .then(windowsH => {
                                                    const windowsHeadersDir = dirname(windowsH);
                                                    if (basename(windowsHeadersDir).toLowerCase() === "include") {
                                                        const windowsHeadersParentDir = dirname(windowsHeadersDir);
                                                        externalDepsDirs.push(windowsHeadersParentDir);
                                                    }
                                                    resolve(externalDepsDirs);
                                                })
                                                .catch(matchErr => {
                                                    resolve(externalDepsDirs);
                                                });
                                        })
                                        .catch(dumpMachineErr => {
                                            resolve(externalDepsDirs);
                                        });
                                }
                                else {
                                    resolve(externalDepsDirs);
                                }
                            })
                            .catch(ccIncludeStatErr => {
                                resolve(externalDepsDirs);
                            });
                    }
                    else {
                        resolve(externalDepsDirs);
                    }
                })
                .catch(whereErr => {
                    resolve(externalDepsDirs);
                });
        });
    }
    private setInstallationResult(installDir: string, luaRocksTool: string, luaRocksAdminTool: string): void {
        this.project.installationResult().setValue(
            new LuaRocksInstallation(installDir, luaRocksTool, luaRocksAdminTool)
        );
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const isGccLike = isGccLikeToolchain(this.project.getToolchain());
            const buildInfo = this.parent.getLuaRocksBuildInfo();
            const srcInfo = buildInfo.getSourcesInfo();
            const infoDetails = srcInfo.getDetails();
            const installDir = this.project.getInstallDir();
            const binDir = this.project.getInstallBinDir();
            const luaInstallation = this.project.getLuaInstallation();
            if (infoDetails instanceof LuaRocksWindowsSourcesInfoDetails) {
                const luarocks = join(binDir, basename(infoDetails.getLuaRocks()));
                const luarocksAdmin = join(binDir, basename(infoDetails.getLuaRocksAdmin()));
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                        if (isGccLike) {
                            this.getWindowsGccExternalDepsDirs()
                                .then(externalDepsDirs => {
                                    const toolchainEnvVars: EnvVar[] = [
                                        { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                        { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                        { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                        { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                                        { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                                        { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() },
                                        { key: "RC", value: ToolchainEnvironmentVariables.instance().getRC() }
                                    ];
                                    const configChanges = [
                                        () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                        () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                                        () => this.setEnvironmentVariablesOnGitHub(luarocks)
                                    ];
                                    const externalDepsDirsPromisesGen = (k: number) => {
                                        return () => this.setLuaRocksConfig(luarocks, `external_deps_dirs[${k + 1}]`, externalDepsDirs[k]);
                                    };
                                    for (let idxExternalDepsDirs = 0; idxExternalDepsDirs < externalDepsDirs.length; idxExternalDepsDirs++) {
                                        configChanges.push(externalDepsDirsPromisesGen(idxExternalDepsDirs));
                                    }
                                    sequentialPromises<void>(configChanges)
                                        .then(_values => {
                                            this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                            resolve();
                                        })
                                        .catch(reject);
                                })
                                .catch(reject);
                        }
                        else { /* MSVC */
                            if (basename(luaInstallation.getLuaInterpreter()) === "luajit.exe") {
                                /*
                                ** For a LuaJIT build using MSVC,
                                ** msvcbuild.bat only supports
                                ** cl and link, not clang-cl.
                                ** So, environment variables for
                                ** different toolchains are not set.
                                */
                                sequentialPromises<void>([
                                    () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                    () => this.setEnvironmentVariablesOnGitHub(luarocks)
                                ])
                                    .then(_values => {
                                        this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                        resolve();
                                    })
                                    .catch(reject);
                            }
                            else {
                                const toolchainEnvVars: EnvVar[] = [
                                    { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                    { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                    { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                    { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() }
                                ];
                                sequentialPromises<void>([
                                    () => this.setLuaRocksConfigSetupOnWindows(luarocks, luaInstallation.getLuaShortVersion(), installDir),
                                    () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                                    () => this.setEnvironmentVariablesOnGitHub(luarocks)
                                ])
                                    .then(_values => {
                                        this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                        resolve();
                                    })
                                    .catch(reject);
                            }
                        }
                    })
                    .catch(reject);
            }
            else if (infoDetails instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                const luarocks = join(binDir, "luarocks");
                const luarocksAdmin = join(binDir, "luarocks-admin");
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                        const luarocksConfig = join(
                            this.project.getInstallDir(),
                            "etc",
                            "luarocks",
                            `config-${luaInstallation.getLuaShortVersion()}.lua`
                        );
                        checkFiles([luarocksConfig])
                            .then(() => {
                                const installDirUnix = infoDetails.getInstallDirPath().getUnixPath();
                                getFirstLineFromProcessExecution(
                                    infoDetails.getCygpath(),
                                    [
                                        "-m",
                                        installDir
                                    ],
                                    true
                                )
                                    .then(installDirMixed => {
                                        /*
                                        ** for each file listed in the following
                                        ** array, we are going to replace
                                        ** Lua's install directory (which is written
                                        ** as a Unix dir) by the corresponding
                                        ** path formatted as Windows directory.
                                        ** However, we are going to use
                                        ** slash (/) as directory separator.
                                        ** In short:
                                        ** path/to/lua_dir -> $(cygpath -m "path/to/lua_dir")
                                        */
                                        const replacements: ReplacementInFile[] = [
                                            {
                                                filepath: luarocks,
                                                linesToSkip: 1 /* skip shebang */
                                            },
                                            { 
                                                filepath: luarocksAdmin,
                                                linesToSkip: 1 /* skip shebang */
                                            },
                                            {
                                                filepath: luarocksConfig,
                                                linesToSkip: 0
                                            }
                                        ];
                                        const replacement_iter = (i: number) => {
                                            if (i < replacements.length) {
                                                const replacement = replacements[i];
                                                replaceAllInFile(
                                                    replacement.filepath,
                                                    replacement.linesToSkip,
                                                    installDirUnix,
                                                    installDirMixed
                                                )
                                                    .then(() => {
                                                        replacement_iter(i + 1);
                                                    })
                                                    .catch(reject);
                                            }
                                            else {
                                                getFirstLineFromProcessExecution(
                                                    infoDetails.getCygpath(),
                                                    [ "-u", luarocks ],
                                                    true
                                                )
                                                    .then(luaRocksUnix => {
                                                        const bash = infoDetails.getBash();
                                                        if (isGccLike) {
                                                            this.getWindowsGccExternalDepsDirs()
                                                                .then(externalDepsDirs => {
                                                                    const toolchainEnvVars: EnvVar[] = [
                                                                        { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                                                        { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                                                        { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                                                        { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                                                                        { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                                                                        { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() },
                                                                        { key: "RC", value: ToolchainEnvironmentVariables.instance().getRC() }
                                                                    ];
                                                                    const configChanges = [
                                                                        () => this.setCygwinLuaRocksConfig(bash, luaRocksUnix, "cmake_generator", "MinGW Makefiles"),
                                                                        () => this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, "PWD", "cd"),
                                                                        () => this.setCygwinLuaRocksToolchainEnvVars(bash, luaRocksUnix, toolchainEnvVars),
                                                                        () => this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                                    ];
                                                                    const externalDepsDirsPromisesGen = (k: number) => {
                                                                        return () => this.setCygwinLuaRocksConfig(bash, luaRocksUnix, `external_deps_dirs[${k + 1}]`, externalDepsDirs[k]);
                                                                    };
                                                                    for (let idxExternalDepsDirs = 0; idxExternalDepsDirs < externalDepsDirs.length; idxExternalDepsDirs++) {
                                                                        configChanges.push(externalDepsDirsPromisesGen(idxExternalDepsDirs));
                                                                    }
                                                                    sequentialPromises<void>(configChanges)
                                                                        .then(_values => {
                                                                            this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                                            resolve();
                                                                        })
                                                                        .catch(reject);
                                                                })
                                                                .catch(reject);
                                                        }
                                                        else { /* MSVC */
                                                            if (basename(luaInstallation.getLuaInterpreter()) === "luajit.exe") {
                                                                /*
                                                                ** For a LuaJIT build using MSVC,
                                                                ** msvcbuild.bat only supports
                                                                ** cl and link, not clang-cl.
                                                                ** So, environment variables for
                                                                ** different toolchains are not set.
                                                                */
                                                                this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                                    .then(() => {
                                                                        this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                                        resolve();
                                                                    })
                                                                    .catch(reject);
                                                            }
                                                            else {
                                                                const toolchainEnvVars: EnvVar[] = [
                                                                    { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                                                                    { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                                                                    { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                                                                    { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() }
                                                                ];
                                                                sequentialPromises<void>([
                                                                    () => this.setCygwinLuaRocksConfigVariable(bash, luaRocksUnix, "PWD", "cd"),
                                                                    () => this.setCygwinLuaRocksToolchainEnvVars(bash, luaRocksUnix, toolchainEnvVars),
                                                                    () => this.setCygwinEnvironmentVariablesOnGitHub(bash, luaRocksUnix)
                                                                ])
                                                                    .then(_values => {
                                                                        this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                                                        resolve();
                                                                    })
                                                                    .catch(reject);
                                                            }
                                                        }
                                                    })
                                                    .catch(reject);
                                            }
                                        };

                                        replacement_iter(0);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            }
            else {
                const luarocks = join(binDir, "luarocks");
                const luarocksAdmin = join(binDir, "luarocks-admin");
                checkFiles([luarocks, luarocksAdmin])
                    .then(() => {
                        const toolchainEnvVars: EnvVar[] = [
                            { key: "MAKE", value: ToolchainEnvironmentVariables.instance().getMake() },
                            { key: "CC", value: ToolchainEnvironmentVariables.instance().getCC() },
                            { key: "LD", value: ToolchainEnvironmentVariables.instance().getLD() },
                            { key: "AR", value: ToolchainEnvironmentVariables.instance().getAR() },
                            { key: "STRIP", value: ToolchainEnvironmentVariables.instance().getSTRIP() },
                            { key: "RANLIB", value: ToolchainEnvironmentVariables.instance().getRANLIB() }
                        ];
                        sequentialPromises<void>([
                            () => this.setLuaRocksToolchainEnvVars(luarocks, toolchainEnvVars),
                            () => this.setEnvironmentVariablesOnGitHub(luarocks)
                        ])
                            .then(_values => {
                                this.setInstallationResult(installDir, luarocks, luarocksAdmin);
                                resolve();
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Post install for LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}