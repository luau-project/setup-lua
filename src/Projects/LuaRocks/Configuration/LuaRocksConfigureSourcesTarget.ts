import { basename } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { executeProcess } from "../../../Util/ExecuteProcess";
import { LuaRocksApplyPatchesTarget } from "./LuaRocksApplyPatchesTarget";
import { LuaRocksFinishConfigurationTarget } from "./LuaRocksFinishConfigurationTarget";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksUnixSourcesInfoDetails } from "./LuaRocksSourcesInfo";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { Console } from "../../../Console";
import { isCygwin } from "../../../Util/CygwinDetection";

export class LuaRocksConfigureSourcesTarget implements ITarget {
    private parent: LuaRocksApplyPatchesTarget;
    private project: LuaRocksProject;
    constructor(project: LuaRocksProject, parent: LuaRocksApplyPatchesTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getNext(): ITarget | null {
        return new LuaRocksFinishConfigurationTarget(this.project, this);
    }
    private setConfigurationResult(): void {
        this.project.configurationResult()
            .setValue(this.parent.getLuaRocksSourcesInfo());
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const luaInstallation = this.project.getLuaInstallation();
            const interpreter = basename(luaInstallation.getLuaInterpreter());
            const luaShortVersion = luaInstallation.getLuaShortVersion();
            const cygwin = isCygwin();
            if (process.platform === 'win32' && !cygwin) {
                this.setConfigurationResult();
                resolve();
            }
            else {
                const sourcesInfo = this.parent.getLuaRocksSourcesInfo();
                const details = sourcesInfo.getDetails();
                if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                    const dirUnix = details.getDirPath().getUnixPath();
                    const configureScriptUnix = details.getConfigureScriptPath().getUnixPath();
                    const installDirUnix = details.getInstallDirPath().getUnixPath();
                    executeProcess(details.getBash(), {
                        args: [
                            "-lc",
                            `cd '${dirUnix}' && '${configureScriptUnix}' '--prefix=${installDirUnix}' '--lua-version=${luaShortVersion}' '--with-lua=${installDirUnix}' '--with-lua-interpreter=${interpreter}'`,
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.setConfigurationResult();
                            resolve();
                        })
                        .catch(reject);
                }
                else if (details instanceof LuaRocksUnixSourcesInfoDetails) {
                    const installDir = this.project.getInstallDir();
                    executeProcess(details.getConfigureScript(), {
                        cwd: sourcesInfo.getDir(),
                        args: [
                            `--prefix=${installDir}`,
                            `--lua-version=${luaShortVersion}`,
                            `--with-lua=${installDir}`,
                            `--with-lua-interpreter=${interpreter}`
                        ],
                        verbose: true,
                        stdout: defaultStdOutHandler
                    })
                        .then(code => {
                            this.setConfigurationResult();
                            resolve();
                        })
                        .catch(reject);
                }
                else {
                    reject(new Error("Internal error: unexpected LuaRocks sources info details for Unix systems"));
                }
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Configure LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}