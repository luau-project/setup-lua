import { ToolchainEnvironmentVariables } from "../../../Toolchains/ToolchainEnvironmentVariables";
import { executeProcess, getFirstLineFromProcessExecution } from "../../../Util/ExecuteProcess";
import { defaultStdOutHandler } from "../../../Util/DefaultStdOutHandler";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksSourcesInfo, LuaRocksUnixSourcesInfoDetails } from "../Configuration/LuaRocksSourcesInfo";
import { LuaRocksProject } from "../LuaRocksProject";
import { LuaRocksUnixBuildInfo, LuaRocksWindowsBuildInfo } from "./LuaRocksBuildInfo";
import { LuaRocksFinishBuildingTarget } from "./LuaRocksFinishBuildingTarget";
import { Console } from "../../../Console";
import { isCygwin } from "../../../Util/CygwinDetection";
import { getCygpathFromCygwin } from "../../../Util/CygwinPath";
import { sequentialPromises } from "../../../Util/SequentialPromises";
import { checkFiles } from "../../../Util/CheckFiles";

export class LuaRocksBuildTarget implements ITarget {
    private parent: ITarget | null;
    private project: LuaRocksProject;
    private srcInfo: LuaRocksSourcesInfo;
    constructor(project: LuaRocksProject, parent: ITarget | null, sourcesInfo: LuaRocksSourcesInfo) {
        this.parent = parent;
        this.project = project;
        this.srcInfo = sourcesInfo;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Build LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
    getLuaRocksSourcesInfo(): LuaRocksSourcesInfo {
        return this.srcInfo;
    }
    getNext(): ITarget | null {
        return new LuaRocksFinishBuildingTarget(this.project, this);
    }
    private setUnixBuildResult(make: string, makeArgs: string[]) {
        this.project.buildResult().setValue(
            new LuaRocksUnixBuildInfo(this.srcInfo, make, makeArgs)
        );
    }
    private setWindowsBuildResult(): void {
        this.project.buildResult().setValue(
            new LuaRocksWindowsBuildInfo(this.srcInfo)
        );
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const details = this.srcInfo.getDetails();
            if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                const make = "make";
                const makeArgs: string[] = ["-C", `'${details.getDirPath().getUnixPath()}'`];
                executeProcess(details.getBash(), {
                    args: ["-lc", `${make} ${makeArgs.join(" ")}`],
                    verbose: true,
                    stdout: defaultStdOutHandler
                })
                    .then(code => {
                        this.setUnixBuildResult(make, makeArgs);
                        resolve();
                    })
                    .catch(reject);
            }
            else if (details instanceof LuaRocksUnixSourcesInfoDetails) {
                const make = ToolchainEnvironmentVariables.instance().getMake();
                const makeArgs: string[] = ["-C", this.srcInfo.getDir()];
                executeProcess(make, {
                    args: makeArgs,
                    verbose: true,
                    stdout: defaultStdOutHandler
                })
                    .then(code => {
                        this.setUnixBuildResult(make, makeArgs);
                        resolve();
                    })
                    .catch(reject);
            }
            else {
                this.setWindowsBuildResult();
                resolve();
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Build LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}