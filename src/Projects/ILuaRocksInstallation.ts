export interface ILuaRocksInstallation {
    getInstallDir(): string;
    getLuaRocksTool(): string;
    getLuaRocksAdminTool(): string;
}

export class LuaRocksInstallation {
    private installDir: string;
    private luaRocksTool: string;
    private luaRocksAdminTool: string;

    constructor(installDir: string, luaRocksTool: string, luaRocksAdminTool: string) {
        this.installDir = installDir;
        this.luaRocksTool = luaRocksTool;
        this.luaRocksAdminTool = luaRocksAdminTool;
    }

    getInstallDir(): string {
        return this.installDir;
    }

    getLuaRocksTool(): string {
        return this.luaRocksTool;
    }

    getLuaRocksAdminTool(): string {
        return this.luaRocksAdminTool;
    }
}