/*
** The MIT License (MIT)
**
** Copyright (c) 2025 - 2026 luau-project           [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
** Copyright (c) 2026 - 2026 setup-lua contributors [https://github.com/luau-project/setup-lua](https://github.com/luau-project/setup-lua)
**
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
**
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
**
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../../Targets/ITarget";
import { PucLuaProject } from "../PucLuaProject";
import { PucLuaLinkCompilerTarget } from "./PucLuaLinkCompilerTarget";
import { PucLuaBuildInfo } from "./PucLuaBuildInfo";
import { isGccLikeToolchain } from "../../../Toolchains/GCC/IGccLikeToolchain";
import { PucLuaFinishBuildingTarget } from "./PucLuaFinishBuildingTarget";
import { Console } from "../../../Console";

export class PucLuaCreatePkgConfigTarget implements ITarget {
    private parent: PucLuaLinkCompilerTarget;
    private project: PucLuaProject;
    private pkgConfig?: string;
    constructor(project: PucLuaProject, parent: PucLuaLinkCompilerTarget) {
        this.project = project;
        this.parent = parent;
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Create pkgconfig file for Lua ${this.project.getVersion().getString()} building`);
            resolve();
        });
    }
    getNext(): ITarget | null {
        return new PucLuaFinishBuildingTarget(this.project, this);
    }
    private setBuildResult(): void {
        this.project.buildResult().setValue(
            new PucLuaBuildInfo(
                this.parent.getSourcesInfo(),
                this.parent.getSharedLibrary(),
                this.parent.getStaticLibrary(),
                this.parent.getInterpreter(),
                this.parent.getCompiler(),
                <string>this.pkgConfig,
                this.parent.getImportLibrary()
            )
        );
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const lines: string[] = [];

            const version = this.project.getVersion();
            const compatFlag = this.parent.getSourcesInfo().getCompatFlag();
            const libname = `lua${version.getMajor()}${version.getMinor()}`;

            let prefix = this.project.getInstallDir();
            let incdir = this.project.getInstallIncludeDir();
            let bindir = this.project.getInstallBinDir();
            let libdir = this.project.getInstallLibDir();
            let lmod = this.project.getInstallLuaModulesDir();
            let cmod = this.project.getInstallCModulesDir();
            let mandir = this.project.getInstallManDir();

            if (process.platform === "win32") {
                prefix = prefix.replace(/\\/g, "/");
                incdir = incdir.replace(/\\/g, "/");
                bindir = bindir.replace(/\\/g, "/");
                libdir = libdir.replace(/\\/g, "/");
                lmod = lmod.replace(/\\/g, "/");
                cmod = cmod.replace(/\\/g, "/");
                mandir = mandir.replace(/\\/g, "/");
            }

            lines.push(`prefix=${prefix}`);
            lines.push(`exec_prefix=${prefix}`);
            lines.push(`lib_name=${libname}`);
            lines.push(`includedir=${incdir}`);
            lines.push(`bindir=${bindir}`);
            lines.push(`libdir=${libdir}`);
            lines.push(`V=${version.getMajor()}.${version.getMinor()}`);
            lines.push(`R=${version.getString()}`);
            lines.push("");
            lines.push(`INSTALL_BIN=${bindir}`);
            lines.push(`INSTALL_INC=${incdir}`);
            lines.push(`INSTALL_LIB=${libdir}`);
            lines.push(`INSTALL_MAN=${mandir}`);
            lines.push(`INSTALL_LMOD=${lmod}`);
            lines.push(`INSTALL_CMOD=${cmod}`);
            lines.push("");
            lines.push("Name: Lua");
            lines.push("Description: An Extensible Extension Language");
            lines.push("Version: ${R}");
            lines.push("Requires:");
            lines.push("Libs: -L${libdir} -l${lib_name}");
            let syslibs = '';
            if (process.platform === 'win32') {
                const toolchain = this.project.getToolchain();
                if (isGccLikeToolchain(toolchain)) {
                    syslibs = "-lm";
                }
            }
            else if (process.platform === 'linux' || process.platform === 'cygwin') {
                syslibs = "-lm -ldl -lreadline";
            }
            else if (process.platform === "darwin") {
                syslibs = "-lm -lreadline";
            }
            else if (process.platform === 'freebsd' || process.platform === 'netbsd' || process.platform === 'openbsd') {
                syslibs = "-lm -ledit";
            }
            else if (process.platform === 'sunos' || process.platform === 'aix') {
                syslibs = '-lm -ldl';
            }
            lines.push(`Libs.private: ${syslibs}`);
            if (compatFlag) {
                lines.push("Cflags: -I${includedir} " + `-D${compatFlag}`);
            }
            else {
                lines.push("Cflags: -I${includedir}");
            }
            const pkgConfigFileName = join(this.project.getSharedLibBuildDir(), `${libname}.pc`);
            writeFile(pkgConfigFileName, lines.join("\n"), { encoding: "utf8" })
                .then(() => {
                    this.pkgConfig = pkgConfigFileName;
                    this.setBuildResult();
                    resolve();
                })
                .catch(reject);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Create pkgconfig file for Lua ${this.project.getVersion().getString()} building`);
            resolve();
        });
    }
    getProject(): IProject {
        return this.project;
    }
    getParent(): ITarget | null {
        return this.parent;
    }
}