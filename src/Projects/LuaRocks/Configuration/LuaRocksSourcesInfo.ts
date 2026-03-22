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