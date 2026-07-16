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

import { delimiter } from "node:path";
import { appendToGitHubEnvironmentVariables, appendToGitHubPath } from "../../Util/GitHub";
import { IProject } from "../IProject";
import { ITarget } from "./ITarget";
import { PromiseCallback, sequentialPromises } from "../../Util/SequentialPromises";
import { isCygwinOnCI } from "../../Util/CygwinDetection";
import { exportLuaEnvVarsOnCygwinProfile } from "../../Util/CygwinEnvVars";

export abstract class AbstractUpdateLuaEnvVarsTarget implements ITarget {
    private parent: ITarget | null;
    private project: IProject;
    constructor(project: IProject, parent: ITarget | null) {
        this.project = project;
        this.parent = parent;
    }
    abstract init(): Promise<void>;
    abstract getNext(): ITarget | null;
    abstract finalize(): Promise<void>;
    abstract getProjectInstallDir(): string;
    abstract getProjectInstallLibDir(): string;
    abstract getProjectInstallBinDir(): string;
    abstract getProjectInstallPkgConfigDir(): string;
    private setConfigPathToGitHub(envVar: string, targetDir: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const currentEnvVar = (process.env[envVar] || "").trim();
            const newEnvVar = currentEnvVar ?
                `${currentEnvVar}${delimiter}${targetDir}` : 
                `${targetDir}`;
            appendToGitHubEnvironmentVariables(envVar, newEnvVar)
                .then(resolve)
                .catch(reject);
        });
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const pkgConfigPath = this.getProjectInstallPkgConfigDir();
            const cmakePrefixPath = this.getProjectInstallDir();
            const binDir = this.getProjectInstallBinDir();

            const changes: PromiseCallback<void>[] = [
                () => this.setConfigPathToGitHub("PKG_CONFIG_PATH", pkgConfigPath),
                () => this.setConfigPathToGitHub("CMAKE_PREFIX_PATH", cmakePrefixPath)
            ];

            if (process.platform === "darwin") {
                changes.push(() => this.setConfigPathToGitHub("DYLD_LIBRARY_PATH", this.getProjectInstallLibDir()));
            }
            else if (process.platform !== "win32") {
                changes.push(() => this.setConfigPathToGitHub("LD_LIBRARY_PATH", this.getProjectInstallLibDir()));
            }

            changes.push(() => appendToGitHubPath(binDir));

            sequentialPromises(changes)
                .then(_ => {
                    if (isCygwinOnCI()) {
                        /* we are on a GitHub action inside MSYS2 */
                        exportLuaEnvVarsOnCygwinProfile(pkgConfigPath, cmakePrefixPath, binDir)
                            .then(resolve)
                            .catch(reject);
                    }
                    else
                    {
                        resolve();
                    }
                })
                .catch(reject);
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
}