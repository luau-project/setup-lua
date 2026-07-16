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

import { GitHubInput } from "../Util/GitHubInput";
import { parseInputSemiColon } from "../Util/ParseInputSemiColon";

export interface IToolchainEnvironmentVariables {
    getRawCC(): string;
    getRawLD(): string;
    getRawAR(): string;
    getRawSTRIP(): string;
    getRawRANLIB(): string;
    getRawRC(): string;
    getCC(): string;
    getLD(): string;
    getAR(): string;
    getSTRIP(): string;
    getRANLIB(): string;
    getRC(): string;
    getMake(): string;
    getToolchainPrefix(): string;

    getCflagsExtra(): string[];
    getIncDirsExtra(): string[];
    getLdFlagsExtra(): string[];
    getLibDirsExtra(): string[];
    getLibsExtra(): string[];
    getLuaPatches(): string[];
    getLuaRocksPatches(): string[];
}

export class ToolchainEnvironmentVariables implements IToolchainEnvironmentVariables {
    private static _instance: IToolchainEnvironmentVariables;
    static instance(): IToolchainEnvironmentVariables {
        if (!ToolchainEnvironmentVariables._instance) {
            ToolchainEnvironmentVariables._instance = new ToolchainEnvironmentVariables();
        }
        return ToolchainEnvironmentVariables._instance;
    }
    getRawCC(): string {
        let msystem = process.env["MSYSTEM"] || "";
        if (msystem) {
            msystem = msystem.toUpperCase().trim();
        }

        return (GitHubInput.instance().getInputCC() || process.env["CC"] ||
            (process.env["VCINSTALLDIR"] ? "cl" :
                ((process.platform === 'win32' && !msystem.startsWith("CLANG")) ? "gcc" : "cc"))).trim();
    }
    getRawLD(): string {
        let msystem = process.env["MSYSTEM"] || "";
        if (msystem) {
            msystem = msystem.toUpperCase().trim();
        }

        return (GitHubInput.instance().getInputLD() || process.env["LD"] ||
            (process.env["VCINSTALLDIR"] ? "link" :
                ((process.platform === 'win32' && !msystem.startsWith("CLANG")) ? "gcc" : "cc"))).trim();
    }
    getRawAR(): string {
        return (GitHubInput.instance().getInputAR() || process.env["AR"] || (process.env["VCINSTALLDIR"] ? "lib" : "ar")).trim();
    }
    getRawSTRIP(): string {
        return (GitHubInput.instance().getInputSTRIP() || process.env["STRIP"] || "strip").trim();
    }
    getRawRANLIB(): string {
        return (GitHubInput.instance().getInputRANLIB() || process.env["RANLIB"] || "ranlib").trim();
    }
    getRawRC(): string {
        return (GitHubInput.instance().getInputRC() || process.env["RC"] || (process.env["VCINSTALLDIR"] ? "rc" : "windres")).trim();
    }
    getCC(): string {
        return this.getToolchainPrefix() + this.getRawCC();
    }
    getLD(): string {
        return this.getToolchainPrefix() + this.getRawLD();
    }
    getAR(): string {
        return this.getToolchainPrefix() + this.getRawAR();
    }
    getSTRIP(): string {
        return this.getToolchainPrefix() + this.getRawSTRIP();
    }
    getRANLIB(): string {
        return this.getToolchainPrefix() + this.getRawRANLIB();
    }
    getRC(): string {
        return this.getToolchainPrefix() + this.getRawRC();
    }
    getMake(): string {
        return (GitHubInput.instance().getInputMake() || process.env["MAKE"] ||
            (process.env["VCINSTALLDIR"] ? "nmake" : 
                (process.platform === 'win32' ?
                    "mingw32-make" :
                    (process.platform === 'freebsd' || process.platform === 'openbsd' || process.platform === 'netbsd') ?
                    "gmake" : "make"))).trim();
    }
    getToolchainPrefix(): string {
        return (GitHubInput.instance().getInputToolchainPrefix() || process.env["TOOLCHAIN_PREFIX"] || "");
    }

    private getSemiColonSeparatedInput(inputGetter: () => string | undefined, inputName: string): string[] {
        const rawInput = inputGetter() || process.env[inputName];
        return parseInputSemiColon(rawInput);
    }
    getCflagsExtra(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputCflagsExtra(),
            "CFLAGS_EXTRA"
        );
    }
    getIncDirsExtra(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputIncDirsExtra(),
            "INCDIRS_EXTRA"
        );
    }
    getLdFlagsExtra(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputLdflagsExtra(),
            "LDFLAGS_EXTRA"
        );
    }
    getLibDirsExtra(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputLibDirsExtra(),
            "LIBDIRS_EXTRA"
        );
    }
    getLibsExtra(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputLibsExtra(),
            "LIBS_EXTRA"
        );
    }
    getLuaPatches(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputLuaPatches(),
            "LUA_PATCHES"
        );
    }
    getLuaRocksPatches(): string[] {
        return this.getSemiColonSeparatedInput(
            () => GitHubInput.instance().getInputLuaRocksPatches(),
            "LUAROCKS_PATCHES"
        );
    }
    private constructor() {
    }
}