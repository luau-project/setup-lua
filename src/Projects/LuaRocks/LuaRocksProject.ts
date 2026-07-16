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
import { IToolchain } from "../../Toolchains/IToolchain";
import { GetSetProperty } from "../../Util/GetSetProperty";
import { IGetSetProperty } from "../../Util/IGetSetProperty";
import { IProject } from "../IProject";
import { TargetPipeline } from "../Targets/TargetPipeline";
import { LuaRocksCreateBuildDirectoriesTarget } from "./Configuration/LuaRocksCreateBuildDirectoriesTarget";
import { ILuaRocksVersion } from "./LuaRocksVersion";
import { LuaRocksBuildTarget } from "./Building/LuaRocksBuildTarget";
import { LuaRocksInstallTarget } from "./Installation/LuaRocksInstallTarget";
import { ILuaInstallation } from "../ILuaInstallation";

export class LuaRocksProject implements IProject {
    private version: ILuaRocksVersion;
    private buildDir: string;
    private installDir: string;
    private luaInstallation: ILuaInstallation;
    private toolchain: IToolchain;
    /* build directories */
    private remotePatchesBuildDir: string;
    /* install directories */
    private installBinDir: string;
    private _configurationResult: IGetSetProperty<any>;
    private _buildResult: IGetSetProperty<any>;
    private _installationResult: IGetSetProperty<any>;

    getVersion(): ILuaRocksVersion {
        return this.version;
    }
    getBuildDir(): string {
        return this.buildDir;
    }
    getRemotePatchesBuildDir(): string {
        return this.remotePatchesBuildDir;
    }
    getInstallDir(): string {
        return this.installDir;
    }
    getLuaInstallation(): ILuaInstallation {
        return this.luaInstallation;
    }
    getToolchain(): IToolchain {
        return this.toolchain;
    }
    getInstallBinDir(): string {
        return this.installBinDir;
    }
    configurationResult(): IGetSetProperty<any> {
        return this._configurationResult;
    }
    buildResult(): IGetSetProperty<any> {
        return this._buildResult;
    }
    installationResult(): IGetSetProperty<any> {
        return this._installationResult;
    }

    constructor(
        version: ILuaRocksVersion,
        buildDir: string,
        installDir: string,
        luaInstallation: ILuaInstallation,
        toolchain: IToolchain
    ) {
        this.version = version;
        this.buildDir = buildDir;
        this.installDir = installDir;
        this.luaInstallation = luaInstallation;
        this.toolchain = toolchain;
        this.remotePatchesBuildDir = join(this.buildDir, "remote-patches");
        this.installBinDir = join(installDir, "bin");
        this._configurationResult = new GetSetProperty<any>(null);
        this._buildResult = new GetSetProperty<any>(null);
        this._installationResult = new GetSetProperty<any>(null);
    }
    configure(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const initialConfigureTarget = new LuaRocksCreateBuildDirectoriesTarget(this, null);
            const pipeline = new TargetPipeline(initialConfigureTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    build(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const initialBuildTarget = new LuaRocksBuildTarget(this, null, this.configurationResult().getValue());
            const pipeline = new TargetPipeline(initialBuildTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
    install(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const initialInstallTarget = new LuaRocksInstallTarget(this, null, this.buildResult().getValue());
            const pipeline = new TargetPipeline(initialInstallTarget);
            pipeline.execute()
                .then(resolve)
                .catch(reject);
        });
    }
}