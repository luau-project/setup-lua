export interface ILuaInstallation {
    getInstallDir(): string;
    getLuaInterpreter(): string;
    getLuaShortVersion(): string;
}

export class LuaInstallation implements ILuaInstallation {
    private installDir: string;
    private luaInterpreter: string;
    private luaShortVersion: string;

    constructor(installDir: string, luaInterpreter: string, luaShortVersion: string) {
        this.installDir = installDir;
        this.luaInterpreter = luaInterpreter;
        this.luaShortVersion = luaShortVersion;
    }

    getInstallDir(): string {
        return this.installDir;
    }

    getLuaInterpreter(): string {
        return this.luaInterpreter;
    }

    getLuaShortVersion(): string {
        return this.luaShortVersion;
    }
}