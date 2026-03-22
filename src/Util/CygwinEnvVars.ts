import { join } from "node:path";
import { appendFile } from "node:fs/promises";
import { getCygpathFromCygwin } from "./CygwinPath";
import { getFirstLineFromProcessExecution } from "./ExecuteProcess";
import { sequentialPromises } from "./SequentialPromises";

function getCygwinProfilePath(baseDir: string): string {
    return join(baseDir, "etc", "profile.d", "setup-lua.sh");
}

function coreExportEnvVarOnCygwinFile(filepath: string, key: string, value: string, isRawVar: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        appendFile(filepath, [
            isRawVar ? `${key}='${value}'` : `${key}='${value}'":\${${key}}";`,
            `export ${key};`,
            ""
            ].join("\n"),
            { encoding: "utf-8" }
        )
            .then(resolve)
            .catch(reject);
    });
}

export function exportLuaEnvVarsOnCygwinProfile(pkgConfigPath: string, cmakePrefixPath: string, binDir: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
                sequentialPromises<string>([
                    () => getFirstLineFromProcessExecution(cygPath, [ "-w", "/" ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", pkgConfigPath ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", cmakePrefixPath ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-u", binDir ], true)
                ])
                    .then(paths => {
                        const profile = getCygwinProfilePath(paths[0]);

                        sequentialPromises<void>([
                            () => coreExportEnvVarOnCygwinFile(profile, "PKG_CONFIG_PATH", paths[1], false),
                            () => coreExportEnvVarOnCygwinFile(profile, "CMAKE_PREFIX_PATH", paths[2], false),
                            () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[3], false)
                        ]).then(() => {
                            resolve()
                        })
                        .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

export function exportLuaRocksEnvVarsOnCygwinProfile(luaPath: string, luaCPath: string, luaRocksBinDir: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        getCygpathFromCygwin()
            .then(cygPath => {
                sequentialPromises<string>([
                    () => getFirstLineFromProcessExecution(cygPath, [ "-w", "/" ], true),
                    () => getFirstLineFromProcessExecution(cygPath, [ "-p", "-u", luaRocksBinDir ], true)
                ])
                    .then(paths => {
                        const profile = getCygwinProfilePath(paths[0]);

                        sequentialPromises<void>([
                            () => coreExportEnvVarOnCygwinFile(profile, "LUA_PATH", luaPath, true),
                            () => coreExportEnvVarOnCygwinFile(profile, "LUA_CPATH", luaCPath, true),
                            () => coreExportEnvVarOnCygwinFile(profile, "PATH", paths[1], false)
                        ]).then(_values => {
                            resolve()
                        })
                        .catch(reject);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}