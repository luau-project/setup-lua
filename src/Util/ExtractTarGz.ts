import { dirname, join } from "node:path";
import { checkFiles } from "./CheckFiles";
import { findGitForWindowsInstallDir } from "./FindGitForWindowsInstallDir";
import { executeProcess, getFirstLineFromProcessExecution } from "./ExecuteProcess";

export interface ExtractTarGzOptions {
    cwd?: string;
    verbose?: boolean;
}

function getWin32TarPath(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const cmdPath = (process.env["COMSPEC"] || "cmd.exe").trim();
        const cmdDir = dirname(cmdPath);
        const tarPath = cmdDir === "." ? "tar.exe" : join(cmdDir, "tar.exe");

        checkFiles([tarPath])
            .then(() => {
                resolve(tarPath);
            })
            .catch(reject);
    });
}

interface GitTargetProgramPath {
    program: string;
    cygpath: string;
}

function getGitTarPath(): Promise<GitTargetProgramPath> {
    return new Promise<GitTargetProgramPath>((resolve, reject) => {
        findGitForWindowsInstallDir()
            .then(gitDir => {
                const tarPath = join(gitDir, "usr", "bin", "tar.exe");
                const cygpath = join(gitDir, "usr", "bin", "cygpath.exe");
                checkFiles([tarPath, cygpath])
                    .then(() => {
                        resolve({
                            program: tarPath,
                            cygpath: cygpath
                        });
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

function win32ExtractTarGz(inputFile: string, opts?: ExtractTarGzOptions): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
        getWin32TarPath()
            .then(win32Tar => {
                executeProcess(
                    win32Tar,
                    {
                        args: opts && opts.cwd ?
                            ["-C", opts.cwd, "-xf", inputFile] :
                            ["-xf", inputFile], verbose: opts?.verbose
                    }
                )
                    .then(resolve)
                    .catch(reject);
            })
            .catch(win32TarErr => {
                getGitTarPath()
                    .then(gitTargetProgram => {
                        getFirstLineFromProcessExecution(
                            gitTargetProgram.cygpath,
                            ["-u", inputFile],
                            opts?.verbose
                        )
                            .then(inputFileUnixPath => {
                                if (opts && opts.cwd) {
                                    getFirstLineFromProcessExecution(
                                        gitTargetProgram.cygpath,
                                        ["-u", opts.cwd],
                                        opts?.verbose
                                    )
                                        .then(cwdUnixPath => {
                                            executeProcess(
                                                gitTargetProgram.program,
                                                {
                                                    args: ["-C", cwdUnixPath, "-xf", inputFileUnixPath],
                                                    verbose: opts?.verbose
                                                }
                                            )
                                                .then(resolve)
                                                .catch(reject);
                                        });
                                }
                                else {
                                    executeProcess(
                                        gitTargetProgram.program,
                                        {
                                            args: ["-xf", inputFileUnixPath],
                                            verbose: opts?.verbose
                                        }
                                    )
                                        .then(resolve)
                                        .catch(reject);
                                }
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            });
    });
}

export function extractTarGz(inputFile: string, opts?: ExtractTarGzOptions): Promise<number | null> {
    return (process.platform === "win32") ?
        win32ExtractTarGz(inputFile, opts) :
        executeProcess(
            "tar",
            {
                args: opts && opts.cwd ?
                    ["-C", opts.cwd, "-xf", inputFile] :
                    ["-xf", inputFile], verbose: opts?.verbose
            }
        );
}