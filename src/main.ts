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

import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { mkdtemp, stat } from "node:fs/promises";
import { PucLuaProject } from "./Projects/PucLua/PucLuaProject";
import { parsePucLuaVersion, IPucLuaVersion } from "./Projects/PucLua/PucLuaVersion";
import { GccToolchain } from "./Toolchains/GCC/GccToolchain";
import { MsvcToolchain } from "./Toolchains/MSVC/MsvcToolchain";
import { LuaJitProject } from "./Projects/LuaJit/LuaJitProject";
import { ILuaJitRepositoryVersion, parseLuaJitRepositoryVersion } from "./Projects/LuaJit/LuaJitRepositoryVersion";
import { ILuaRocksVersion, parseLuaRocksVersion } from "./Projects/LuaRocks/LuaRocksVersion";
import { LuaRocksProject } from "./Projects/LuaRocks/LuaRocksProject";
import { IToolchain } from "./Toolchains/IToolchain";
import { sequentialPromises } from "./Util/SequentialPromises";
import { GitHubInput } from "./Util/GitHubInput";
import { Console } from "./Console";

function getTempDir(): Promise<string> {
    return new Promise<string>((promiseResolve, reject) => {
        const runnerTemp = process.env["RUNNER_TEMP"];
        if (runnerTemp) {
            stat(runnerTemp)
                .then(s => {
                    if (s.isDirectory()) {
                        promiseResolve(resolve(runnerTemp));
                    }
                    else {
                        reject(new Error("Runner TEMP must be a directory"));
                    }
                })
                .catch(reject);
        }
        else {
            promiseResolve(tmpdir());
        }
    });
}

function readLuaVersionFromEnv(luaVersion: string): Promise<IPucLuaVersion[]> {
    return new Promise<IPucLuaVersion[]>((promiseResolve, reject) => {
        const result: IPucLuaVersion[] = [];
        parsePucLuaVersion(luaVersion)
            .then(targetVersion => {
                result.push(targetVersion);
                promiseResolve(result);
            })
            .catch(err => {
                promiseResolve(result);
            });
    });
}

function readLuaJitRepositoryVersionFromEnv(luaVersion: string): Promise<ILuaJitRepositoryVersion[]> {
    return new Promise<ILuaJitRepositoryVersion[]>((promiseResolve, reject) => {
        const result: ILuaJitRepositoryVersion[] = [];
        parseLuaJitRepositoryVersion(luaVersion)
            .then(targetVersion => {
                result.push(targetVersion);
                promiseResolve(result);
            })
            .catch(err => {
                promiseResolve(result);
            });
    });
}

function readLuaRocksVersionFromEnv(luaRocksVersion: string): Promise<ILuaRocksVersion[]> {
    return new Promise<ILuaRocksVersion[]>((promiseResolve, reject) => {
        const result: ILuaRocksVersion[] = [];
        parseLuaRocksVersion(luaRocksVersion)
            .then(targetVersion => {
                if (targetVersion) {
                    result.push(targetVersion);
                }
                promiseResolve(result);
            })
            .catch(err => {
                promiseResolve(result);
            });
    });
}

function installLuaProject(
    luaProject: PucLuaProject | LuaJitProject,
    buildDir: string,
    installDir: string,
    toolchain: IToolchain
): Promise<void> {
    return new Promise<void>((promiseResolve, reject) => {
        const luaRocksVersion = (GitHubInput.instance().getInputLuaRocksVersion() || process.env["LUAROCKS_VERSION"] || "").trim();
        sequentialPromises<void>([
            () => luaProject.configure(),
            () => luaProject.build(),
            () => luaProject.install()
        ])
            .then(_ => {
                readLuaRocksVersionFromEnv(luaRocksVersion)
                    .then(lrVersions => {
                        if (lrVersions.length > 0) {
                            const version = lrVersions[0];
                            mkdtemp(join(buildDir, "luarocks-"))
                                .then(luaRocksBuildDir => {
                                    const luaRocksProject = new LuaRocksProject(
                                        version,
                                        luaRocksBuildDir,
                                        installDir,
                                        luaProject.installationResult().getValue(),
                                        toolchain
                                    );
                                    sequentialPromises<void>([
                                        () => luaRocksProject.configure(),
                                        () => luaRocksProject.build(),
                                        () => luaRocksProject.install()
                                    ])
                                        .then(__ => {
                                            promiseResolve();
                                        })
                                        .catch(reject);
                                })
                                .catch(reject);
                        }
                        else {
                            promiseResolve();
                        }
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};

function main(): Promise<void> {
    return new Promise<void>((promiseResolve, reject) => {
        getTempDir()
            .then(tmp => {
                const workingDir = process.cwd();
                const uuid = randomUUID().toString();
                const toolchain = process.env["VCINSTALLDIR"] ? new MsvcToolchain() : new GccToolchain();
                const luaVersion = (GitHubInput.instance().getInputLuaVersion() || process.env["LUA_VERSION"] || "").trim();
                readLuaVersionFromEnv(luaVersion)
                    .then(versions => {
                        if (versions.length > 0) {
                            const version = versions[0];
                            const buildDir = join(tmp, `lua-${version.getString()}-${uuid}-build-dir`);
                            const installDir = GitHubInput.instance().getInputDebugSetupLua() || process.env["DEBUG_SETUP_LUA"] ?
                                join(tmp, `lua-${version.getString()}-${uuid}-install-dir`) :
                                join(workingDir, ".lua");
                            const project = new PucLuaProject(version, buildDir, installDir, toolchain);

                            installLuaProject(project, buildDir, installDir, toolchain)
                                .then(promiseResolve)
                                .catch(reject);
                        }
                        else {
                            readLuaJitRepositoryVersionFromEnv(luaVersion)
                                .then(luajitVersions => {
                                    if (luajitVersions.length > 0) {
                                        const version = luajitVersions[0];
                                        const buildDir = join(tmp, `${version.getKind()}-${uuid}-build-dir`);
                                        const installDir = GitHubInput.instance().getInputDebugSetupLua() || process.env["DEBUG_SETUP_LUA"] ?
                                            join(tmp, `${version.getKind()}-${uuid}-install-dir`) :
                                            join(workingDir, ".lua");
                                        const project = new LuaJitProject(version, buildDir, installDir, toolchain);

                                        installLuaProject(project, buildDir, installDir, toolchain)
                                            .then(promiseResolve)
                                            .catch(reject);
                                    }
                                    else {
                                        reject(new Error("Unknown Lua / LuaJIT / OpenResty version"));
                                    }
                                })
                                .catch(reject);
                        }
                    })
                    .catch(reject);
            })
            .catch(reject);
    })
}

main()
    .then(() => {
        Console.instance().writeLine("finished");
    })
    .catch(err => {
        Console.instance().writeLine(err);
        process.exitCode = 1;
    });