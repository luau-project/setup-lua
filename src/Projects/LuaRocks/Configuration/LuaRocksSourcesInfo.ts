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

import { CygwinFileSystemPath } from "../../../CygwinFileSystemPath";

export class LuaRocksWindowsSourcesInfoDetails {
    private luarocks: string;
    private luarocksAdmin: string;

    getLuaRocks(): string {
        return this.luarocks;
    }
    getLuaRocksAdmin(): string {
        return this.luarocksAdmin;
    }

    constructor(luarocks: string, luarocksAdmin: string) {
        this.luarocks = luarocks;
        this.luarocksAdmin = luarocksAdmin;
    }
}

export class LuaRocksUnixSourcesInfoDetails {
    private configureScript: string;

    getConfigureScript(): string {
        return this.configureScript;
    }

    constructor(configureScript: string) {
        this.configureScript = configureScript;
    }
}

export class LuaRocksCygwinUnixSourcesInfoDetails extends LuaRocksUnixSourcesInfoDetails {
    private bash: string;
    private cygpath: string;
    private dirPath: CygwinFileSystemPath;
    private configureScriptPath: CygwinFileSystemPath;
    private installDirPath: CygwinFileSystemPath;

    constructor(
        bash: string,
        cygpath: string,
        dir: CygwinFileSystemPath,
        configureScript: CygwinFileSystemPath,
        installDir: CygwinFileSystemPath
    ) {
        super(configureScript.getWindowsPath());
        this.bash = bash;
        this.cygpath = cygpath;
        this.dirPath = dir;
        this.configureScriptPath = configureScript;
        this.installDirPath = installDir;
    }

    getBash(): string {
        return this.bash;
    }

    getCygpath(): string {
        return this.cygpath;
    }

    getDirPath(): CygwinFileSystemPath {
        return this.dirPath;
    }

    getConfigureScriptPath(): CygwinFileSystemPath {
        return this.configureScriptPath;
    }

    getInstallDirPath(): CygwinFileSystemPath {
        return this.installDirPath;
    }
}

export class LuaRocksSourcesInfo {
    private dir: string;
    private details: LuaRocksWindowsSourcesInfoDetails | LuaRocksCygwinUnixSourcesInfoDetails | LuaRocksUnixSourcesInfoDetails;

    constructor(dir: string, details: LuaRocksWindowsSourcesInfoDetails | LuaRocksCygwinUnixSourcesInfoDetails | LuaRocksUnixSourcesInfoDetails) {
        this.dir = dir;
        this.details = details;
    }

    getDir(): string {
        return this.dir;
    }

    getDetails(): LuaRocksWindowsSourcesInfoDetails | LuaRocksCygwinUnixSourcesInfoDetails | LuaRocksUnixSourcesInfoDetails {
        return this.details;
    }
}