import { basename, extname, join } from "node:path";
import { constants, readdir, stat } from "node:fs/promises";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { AbstractFetchCompressedTarget } from "../../Targets/Fetch/AbstractFetchCompressedTarget";
import { extractTarGz } from "../../../Util/ExtractTarGz";
import { extractZip } from "../../../Util/ExtractZip";
import { checkFiles } from "../../../Util/CheckFiles";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksSourcesInfo, LuaRocksUnixSourcesInfoDetails, LuaRocksWindowsSourcesInfoDetails } from "./LuaRocksSourcesInfo";
import { LuaRocksCheckDependenciesTarget } from "./LuaRocksCheckDependenciesTarget";
import { LuaRocksReleaseVersion } from "../LuaRocksVersion";
import { LuaRocksApplyPatchesTarget } from "./LuaRocksApplyPatchesTarget";
import { Console } from "../../../Console";
import { isCygwin } from "../../../Util/CygwinDetection";
import { getCygpathFromCygwin } from "../../../Util/CygwinPath";
import { sequentialPromises } from "../../../Util/SequentialPromises";
import { getFirstLineFromProcessExecution } from "../../../Util/ExecuteProcess";
import { CygwinFileSystemPath } from "../../../CygwinFileSystemPath";

export class LuaRocksFetchTarget extends AbstractFetchCompressedTarget {
    private parent: LuaRocksCheckDependenciesTarget;
    private project: LuaRocksProject;
    private luaRocksSourcesInfo?: LuaRocksSourcesInfo;
    constructor(project: LuaRocksProject, parent: LuaRocksCheckDependenciesTarget) {
        super(
            project.getVersion().getDownloadUrl(),
            project.getBuildDir(),
            project.getVersion() instanceof LuaRocksReleaseVersion ? `luarocks-${project.getVersion().getIdentifier()}` : null,
            extname(basename(project.getVersion().getDownloadUrl())) === ".zip" ? extractZip : extractTarGz,
            project.getVersion() instanceof LuaRocksReleaseVersion ? {
                fileHash: {
                    algorithm: (<LuaRocksReleaseVersion>project.getVersion()).getHashAlgorithm(),
                    expectedHash: (<LuaRocksReleaseVersion>project.getVersion()).getHashValue()
                }
            } : undefined
        )
        this.project = project;
        this.parent = parent;
        this.luaRocksSourcesInfo = undefined;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Fetch LuaRocks ${this.project.getVersion().getIdentifier()}`);
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
        return new LuaRocksApplyPatchesTarget(this.project, this);
    }
    getLuaRocksSourcesInfo(): LuaRocksSourcesInfo {
        return <LuaRocksSourcesInfo>this.luaRocksSourcesInfo;
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.luaRocksSourcesInfo = undefined;
            super.execute()
                .then(() => {
                    const workDir = this.getWorkDir();
                    const filename = basename(this.project.getVersion().getDownloadUrl());
                    if (process.platform === 'win32' && !isCygwin()) {
                        const extension = extname(filename);
                        if (extension === ".zip") {
                            const extractedDir = filename.substring(0, filename.length - extension.length);
                            const luarocks = join(workDir, extractedDir, "luarocks.exe");
                            const luarocksAdmin = join(workDir, extractedDir, "luarocks-admin.exe");

                            checkFiles([luarocks, luarocksAdmin])
                                .then(() => {
                                    this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(
                                        extractedDir,
                                        new LuaRocksWindowsSourcesInfoDetails(luarocks, luarocksAdmin)
                                    );
                                    resolve();
                                })
                                .catch(reject);
                        }
                        else {
                            reject(new Error(".zip extension expected"));
                        }
                    }
                    else {
                        readdir(workDir, { recursive: false })
                            .then(items => {
                                const len = items.length;
                                const dirItem_iter = (i: number) => {
                                    if (i < len) {
                                        const dirItem = items[i];
                                        if (dirItem.startsWith("luarocks-")) {
                                            const extractedDir = join(workDir, dirItem);
                                            stat(extractedDir)
                                                .then(s => {
                                                    if (s.isDirectory()) {
                                                        const configureScript = join(extractedDir, "configure");
                                                        stat(configureScript)
                                                            .then(configureScriptStat => {
                                                                if (configureScriptStat.isFile()) {
                                                                    if (isCygwin()) {
                                                                        getCygpathFromCygwin()
                                                                            .then(cygPath => {
                                                                                const installDir = this.project.getInstallDir();
                                                                                sequentialPromises<string>([
                                                                                    () => getFirstLineFromProcessExecution(cygPath, [ "-w", "/usr/bin/bash.exe"], true),
                                                                                    () => getFirstLineFromProcessExecution(cygPath, [ "-u", extractedDir], true),
                                                                                    () => getFirstLineFromProcessExecution(cygPath, [ "-u", configureScript], true),
                                                                                    () => getFirstLineFromProcessExecution(cygPath, [ "-u", installDir], true)
                                                                                ])
                                                                                    .then(paths => {
                                                                                        const bash = paths[0];
                                                                                        checkFiles([bash])
                                                                                            .then(() => {
                                                                                                const extractedDirUnix = paths[1];
                                                                                                const configureScriptUnix = paths[2];
                                                                                                const installDirUnix = paths[3];
                                                                                                this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(
                                                                                                    extractedDir,
                                                                                                    new LuaRocksCygwinUnixSourcesInfoDetails(
                                                                                                        bash,
                                                                                                        cygPath,
                                                                                                        new CygwinFileSystemPath(extractedDir, extractedDirUnix),
                                                                                                        new CygwinFileSystemPath(configureScript, configureScriptUnix),
                                                                                                        new CygwinFileSystemPath(installDir, installDirUnix)
                                                                                                    )
                                                                                                );
                                                                                                resolve();
                                                                                            })
                                                                                            .catch(reject);
                                                                                    })
                                                                                    .catch(reject);
                                                                            })
                                                                            .catch(reject);
                                                                    }
                                                                    else if (configureScriptStat.mode & constants.X_OK) {
                                                                        this.luaRocksSourcesInfo = new LuaRocksSourcesInfo(
                                                                            extractedDir,
                                                                            new LuaRocksUnixSourcesInfoDetails(configureScript)
                                                                        );
                                                                        resolve();
                                                                    }
                                                                    else {
                                                                        reject(new Error("configure script for LuaRocks is not executable"));
                                                                    }
                                                                }
                                                                else {
                                                                    reject(new Error("configure script for LuaRocks is not a file"));
                                                                }
                                                            })
                                                            .catch(configureScriptErr => {
                                                                if (configureScriptErr.code === "ENOENT") {
                                                                    reject(new Error("configure script for LuaRocks was not found"));
                                                                }
                                                                else {
                                                                    reject(configureScriptErr);
                                                                }
                                                            });
                                                    }
                                                    else {
                                                        dirItem_iter(i + 1);
                                                    }
                                                })
                                                .catch(reject);
                                        }
                                        else {
                                            dirItem_iter(i + 1);
                                        }
                                    }
                                    else {
                                        reject(new Error(`Extracted directory for LuaRocks ${this.project.getVersion().getIdentifier()} was not found`));
                                    }
                                };
    
                                dirItem_iter(0);
                            })
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Fetch LuaRocks ${this.project.getVersion().getIdentifier()}`);
            resolve();
        });
    }
}