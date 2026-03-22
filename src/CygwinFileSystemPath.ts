export class CygwinFileSystemPath {
    private windowsPath: string;
    private unixPath: string;

    getWindowsPath(): string {
        return this.windowsPath;
    }

    getUnixPath(): string {
        return this.unixPath;
    }

    constructor(windowsPath: string, unixPath: string) {
        this.windowsPath = windowsPath;
        this.unixPath = unixPath;
    }
}