import { join } from "node:path";
import { ITarget } from "../../Targets/ITarget";
import { LuaJitProject } from "../LuaJitProject";
import { AbstractUpdateLuaEnvVarsTarget } from "../../Targets/AbstractUpdateLuaEnvVarsTarget";
import { LuaJitFinishInstallationTarget } from "./LuaJitFinishInstallationTarget";
import { Console } from "../../../Console";
import { LuaInstallation } from "../../ILuaInstallation";
import { getFirstLineFromProcessExecution } from "../../../Util/ExecuteProcess";
import { checkFiles } from "../../../Util/CheckFiles";

export class LuaJitPostInstallTarget extends AbstractUpdateLuaEnvVarsTarget {
    constructor(project: LuaJitProject, parent: ITarget | null) {
        super(project, parent);
    }
    getProjectInstallDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallDir();
    }
    getProjectInstallLibDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallLibDir();
    }
    getProjectInstallBinDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallBinDir();
    }
    getProjectInstallPkgConfigDir(): string {
        return (<LuaJitProject>this.getProject()).getInstallPkgConfigDir();
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = (<LuaJitProject>this.getProject()).getVersion();
            Console.instance().writeLine(`[Start] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return new LuaJitFinishInstallationTarget(<LuaJitProject>this.getProject(), this);
    }
    private setInstallationResult(installDir: string, luaInterpreter: string, luaShortVersion: string): void {
        this.getProject().installationResult().setValue(
            new LuaInstallation(installDir, luaInterpreter, luaShortVersion)
        );
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            super.execute()
                .then(() => {
                    const installDir = this.getProjectInstallDir();
                    const binDir = this.getProjectInstallBinDir();
                    const ext = process.platform === "win32" ? ".exe" : "";
                    const luaInterpreter = join(binDir, `luajit${ext}`);

                    checkFiles([luaInterpreter])
                        .then(() => {
                            getFirstLineFromProcessExecution(luaInterpreter, ["-e", "print(_VERSION:sub(5))"], true)
                                .then(luaShortVersion => {
                                    if (luaShortVersion === "5.1") {
                                        this.setInstallationResult(installDir, luaInterpreter, luaShortVersion);
                                        resolve();
                                    }
                                    else {
                                        reject(new Error("Unexpected LuaJIT / OpenResty short version"));
                                    }
                                })
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const projectVersion = (<LuaJitProject>this.getProject()).getVersion();
            Console.instance().writeLine(`[End] Post install for ${projectVersion.getName()} ${projectVersion.getRef()}`);
            resolve();
        });
    }
}