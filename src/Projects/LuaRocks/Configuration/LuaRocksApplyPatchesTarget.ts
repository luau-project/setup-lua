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

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { EOL } from "node:os";
import { ToolchainEnvironmentVariables } from "../../../Toolchains/ToolchainEnvironmentVariables";
import { AbstractApplyPatchesTarget } from "../../Targets/AbstractApplyPatchesTarget";
import { ITarget } from "../../Targets/ITarget";
import { LuaRocksProject } from "../LuaRocksProject";
import { LuaRocksConfigureSourcesTarget } from "./LuaRocksConfigureSourcesTarget";
import { LuaRocksFetchTarget } from "./LuaRocksFetchTarget";
import { LuaRocksCygwinUnixSourcesInfoDetails, LuaRocksSourcesInfo } from "./LuaRocksSourcesInfo";
import { Console } from "../../../Console";
import { checkFiles } from "../../../Util/CheckFiles";
import { sequentialPromises } from "../../../Util/SequentialPromises";
import { replaceFirstInFile } from "../../../Util/ReplaceInFile";

export class LuaRocksApplyPatchesTarget extends AbstractApplyPatchesTarget {
    constructor(project: LuaRocksProject, parent: LuaRocksFetchTarget) {
        super(project, parent, parent.getLuaRocksSourcesInfo().getDir(), project.getRemotePatchesBuildDir(), ToolchainEnvironmentVariables.instance().getLuaRocksPatches());
    }
    init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[Start] Apply patches on LuaRocks ${(<LuaRocksProject>this.getProject()).getVersion().getIdentifier()}`);
            resolve();
        });
    }
    getLuaRocksSourcesInfo(): LuaRocksSourcesInfo {
        return (<LuaRocksFetchTarget>this.getParent()).getLuaRocksSourcesInfo();
    }
    getNext(): ITarget | null {
        return new LuaRocksConfigureSourcesTarget((<LuaRocksProject>this.getProject()), this);
    }
    private cygwinEnsureMsys2MinGWw64FsLuaFile(srcDir: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const msysFsPath = join(srcDir, "src", "luarocks", "fs", "msys2_mingw_w64.lua");
            checkFiles([msysFsPath])
                .then(resolve)
                .catch(err => {
                    writeFile(msysFsPath, [
                        "local msys2_tools = {}",
                        "",
                        "local fs = require(\"luarocks.fs\")",
                        "",
                        "local unix_tools = require(\"luarocks.fs.unix.tools\")",
                        "",
                        "local function uncompress(default_ext, program, infile, outfile)",
                        "   assert(type(infile) == \"string\")",
                        "   assert(outfile == nil or type(outfile) == \"string\")",
                        "   if not outfile then",
                        "      outfile = infile:gsub(\"%.\"..default_ext..\"$\", \"\")",
                        "   end",
                        "   if fs.execute(fs.Q(program)..\" -d -c \"..fs.Q(infile)..\" > \"..fs.Q(outfile)) then",
                        "      return true",
                        "   else",
                        "      return nil, \"failed extracting \" .. infile",
                        "   end",
                        "end",
                        "",
                        "--- Uncompresses a .gz file.",
                        "-- @param infile string: pathname of .gz file to be extracted.",
                        "-- @param outfile string or nil: pathname of output file to be produced.",
                        "-- If not given, name is derived from input file.",
                        "-- @return boolean: true on success; nil and error message on failure.",
                        "function msys2_tools.gunzip(infile, outfile)",
                        "   return uncompress(\"gz\", \"gzip\", infile, outfile)",
                        "end",
                        "",
                        "--- Uncompresses a .bz2 file.",
                        "-- @param infile string: pathname of .bz2 file to be extracted.",
                        "-- @param outfile string or nil: pathname of output file to be produced.",
                        "-- If not given, name is derived from input file.",
                        "-- @return boolean: true on success; nil and error message on failure.",
                        "function msys2_tools.bunzip2(infile, outfile)",
                        "   return uncompress(\"bz2\", \"bzip2\", infile, outfile)",
                        "end",
                        "",
                        "msys2_tools.zip = unix_tools.zip",
                        "msys2_tools.unzip = unix_tools.unzip",
                        "msys2_tools.copy_contents = unix_tools.copy_contents",
                        "",
                        "return msys2_tools"
                    ].join(EOL))
                        .then(resolve)
                        .catch(reject);
                });
        });
    }
    private getLuaRocksPersistPath(srcDir: string): string {
        return join(srcDir, "src", "luarocks", "persist.lua");
    }
    private getLuaRocksGnumakefilePath(srcDir: string): string {
        return join(srcDir, "GNUmakefile");
    }
    private getLuaRocksCoreCfgFilePath(srcDir: string): string {
        return join(srcDir, "src", "luarocks", "core", "cfg.lua");
    }
    private cygwinReadLuaRocksVersionFromCoreCfg(cfgPath: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            readFile(cfgPath, { encoding: "utf-8" })
                .then(content => {
                    const match = /local program_version \= "([0-9]+\.[0-9]+\.[0-9]+)"/.exec(content);
                    if (match) {
                        resolve(match[1]);
                    }
                    else {
                        reject(new Error(`Failed to find LuaRocks version on "${cfgPath}" file`));
                    }
                })
                .catch(reject);
        });
    }
    private cygwinPatchLuaRocksPersist(persistPath: string, luaRocksVersion: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1": {
                    const targetStr = [
                        "-- @return boolean or (nil, string): true if successful, or nil and a",
                        "-- message in case of errors.",
                        "function persist.save_from_table(filename, tbl, field_order)",
                        "   local out = io.open(filename, \"w\")",
                        "   if not out then",
                        "      return nil, \"Cannot create file at \"..filename",
                        "   end",
                        "   local ok, err = write_table_as_assignments(out, tbl, field_order)",
                        "   out:close()",
                        "   if not ok then",
                        "      return nil, err",
                        "   end",
                        "   return true",
                        "end"
                    ].join("\n");
                    const replacementStr = [
                        "-- @return boolean or (nil, string): true if successful, or nil and a",
                        "-- message in case of errors.",
                        "function persist.save_from_table(filename, tbl, field_order)",
                        "   local prefix = dir.dir_name(filename)",
                        "   fs.make_dir(prefix)",
                        "   local out = io.open(filename, \"w\")",
                        "   if not out then",
                        "      return nil, \"Cannot create file at \"..filename",
                        "   end",
                        "   local ok, err = write_table_as_assignments(out, tbl, field_order)",
                        "   out:close()",
                        "   if not ok then",
                        "      return nil, err",
                        "   end",
                        "   return true",
                        "end"
                    ].join("\n");

                    replaceFirstInFile(persistPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    private cygwinPatchGNUmakefile(makefilePath: string, luaRocksVersion: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1":
                case "3.9.2":
                case "3.10.0": {
                    const targetStr = [
                        "",
                        "# ----------------------------------------",
                        "# Base build",
                        "# ----------------------------------------",
                        "",
                        "build: luarocks luarocks-admin $(builddir)/luarocks $(builddir)/luarocks-admin",
                        "",
                        "config.unix:",
                        "	@echo Please run the \"./configure\" script before building.",
                        "	@echo",
                        "	@exit 1",
                        ""
                    ].join("\n");
                    const replacementStr = [
                        "",
                        "# ----------------------------------------",
                        "# Base build",
                        "# ----------------------------------------",
                        "",
                        "build: config.unix $(builddir)/config-$(LUA_VERSION).lua $(builddir)/luarocks $(builddir)/luarocks-admin",
                        "",
                        "config.unix:",
                        "	@echo Please run the \"./configure\" script before building.",
                        "	@echo",
                        "	@exit 1",
                        ""
                    ].join("\n");

                    replaceFirstInFile(makefilePath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    private cygwinPatchCoreCfg(cfgPath: string, luaRocksVersion: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            switch (luaRocksVersion) {
                case "3.9.1":
                case "3.9.2": {
                    const targetStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. hardcoded.WIN_TOOLS .. \"/\" .. defaults.variables[tool] .. \'.exe\"\'",
                        "      end",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    const replacementStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and not platforms.msys2_mingw_w64 and hardcoded.WIN_TOOLS then",
                        "      local dir = require(\"luarocks.core.dir\")",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   elseif platforms.msys2_mingw_w64 then",
                        "      defaults.fs_use_modules = false",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");

                    replaceFirstInFile(cfgPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);

                    break;
                }
                case "3.10.0":
                case "3.11.0":
                case "3.11.1": {
                    const targetStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");
                    const replacementStr = [
                        "   local defaults = make_defaults(cfg.lua_version, processor, platforms, cfg.home)",
                        "",
                        "   if platforms.windows and not platforms.msys2_mingw_w64 and hardcoded.WIN_TOOLS then",
                        "      local tools = { \"SEVENZ\", \"CP\", \"FIND\", \"LS\", \"MD5SUM\", \"WGET\", }",
                        "      for _, tool in ipairs(tools) do",
                        "         defaults.variables[tool] = \'\"\' .. dir.path(hardcoded.WIN_TOOLS, defaults.variables[tool] .. \'.exe\') .. \'\"\'",
                        "      end",
                        "   elseif platforms.msys2_mingw_w64 then",
                        "      defaults.fs_use_modules = false",
                        "   else",
                        "      defaults.fs_use_modules = true",
                        "   end"
                    ].join("\n");

                    replaceFirstInFile(cfgPath, 0, targetStr, replacementStr, "utf8")
                        .then(resolve)
                        .catch(reject);
                    break;
                }
                default: {
                    resolve();
                    break;
                }
            }
        });
    }
    override execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const sourcesInfo = this.getLuaRocksSourcesInfo();
            const details = sourcesInfo.getDetails();
            if (details instanceof LuaRocksCygwinUnixSourcesInfoDetails) {
                super.execute()
                    .then(() => {
                        const srcDir = sourcesInfo.getDir();
                        const cfgPath = this.getLuaRocksCoreCfgFilePath(srcDir);
                        const GNUmakefilePath = this.getLuaRocksGnumakefilePath(srcDir);
                        checkFiles([cfgPath, GNUmakefilePath])
                            .then(() => {
                                this.cygwinReadLuaRocksVersionFromCoreCfg(cfgPath)
                                    .then(luaRocksVersion => {
                                        const patches = [
                                            () => this.cygwinEnsureMsys2MinGWw64FsLuaFile(srcDir),
                                            () => this.cygwinPatchCoreCfg(cfgPath, luaRocksVersion),
                                            () => this.cygwinPatchGNUmakefile(GNUmakefilePath, luaRocksVersion)
                                        ];

                                        if (luaRocksVersion === "3.9.1") {
                                            const persistPath = this.getLuaRocksPersistPath(srcDir);
                                            patches.push(() => checkFiles([persistPath]));
                                            patches.push(() => this.cygwinPatchLuaRocksPersist(persistPath, luaRocksVersion));
                                        }

                                        sequentialPromises<void>(patches)
                                            .then(_ => {
                                                resolve();
                                            })
                                            .catch(reject);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    })
                    .catch(reject);
            }
            else {
                super.execute()
                    .then(resolve)
                    .catch(reject);
            }
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Console.instance().writeLine(`[End] Apply patches on LuaRocks ${(<LuaRocksProject>this.getProject()).getVersion().getIdentifier()}`);
            resolve();
        });
    }
}