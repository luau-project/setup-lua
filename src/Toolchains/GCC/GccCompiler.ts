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

import { ICompiler } from "../ICompiler";
import { executeProcess } from "../../Util/ExecuteProcess";
import { GetSetProperty } from "../../Util/GetSetProperty";
import { IGetSetProperty } from "../../Util/IGetSetProperty";
import { IToolchainCompositeArgument } from "../IToolchainCompositeArgument";
import { ToolchainCompositeArgument } from "../ToolchainCompositeArgument";
import { ToolchainRawArgument } from "../ToolchainRawArgument";
import { ToolchainEnvironmentVariables } from "../ToolchainEnvironmentVariables";

export class GccCompiler implements ICompiler {
    private _path: IGetSetProperty<string>;
    private flags: IToolchainCompositeArgument[];
    private defines: IToolchainCompositeArgument[];
    private includeDirs: IToolchainCompositeArgument[];
    private input?: IToolchainCompositeArgument;
    private output?: IToolchainCompositeArgument;
    private optimization?: IToolchainCompositeArgument;
    private warnings?: IToolchainCompositeArgument;

    addFlag(value: string): void {
        this.flags.push(
            new ToolchainCompositeArgument(
                [new ToolchainRawArgument(value)]
            )
        );
    }
    addDefine(key: string, value?: string): void {
        this.defines.push(
            new ToolchainCompositeArgument(
                value ?
                    [new ToolchainRawArgument(`-D${key}=${value}`)] :
                    [new ToolchainRawArgument(`-D${key}`)]
            )
        )
    }
    addIncludeDir(dir: string): void {
        this.includeDirs.push(
            new ToolchainCompositeArgument(
                [new ToolchainRawArgument(`-I${dir}`)]
            )
        );
    }
    setInputFile(path: string): void {
        this.input = new ToolchainCompositeArgument(
            [new ToolchainRawArgument(path)]
        );
    }
    setOutputFile(path: string): void {
        this.output = new ToolchainCompositeArgument(
            [
                new ToolchainRawArgument("-o"),
                new ToolchainRawArgument(path)
            ]
        );
    }
    setSpeedOptimizationSwitch(): void {
        this.optimization = new ToolchainCompositeArgument(
            [new ToolchainRawArgument("-O2")]
        );
    }
    setWarningSwitch(): void {
        this.warnings = new ToolchainCompositeArgument(
            [
                new ToolchainRawArgument("-Wall"),
                new ToolchainRawArgument("-Wextra")
            ]
        );
    }
    getObjectFileExtension(): string {
        return ".o";
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.output) {
                if (this.input) {
                    const args: string[] = [];
                    const compileOnly = new ToolchainCompositeArgument([new ToolchainRawArgument("-c")]);
                    const arrays: IToolchainCompositeArgument[][] = [[compileOnly]];
                    if (this.optimization) {
                        arrays.push([this.optimization]);
                    }
                    if (this.warnings) {
                        arrays.push([this.warnings]);
                    }
                    for (const instruction of [this.flags, this.defines, this.includeDirs, [this.output], [this.input]]) {
                        arrays.push(instruction);
                    }
                    for (const arrayElement of arrays) {
                        for (const compositeArgument of arrayElement) {
                            const count = compositeArgument.getLenght();
                            for (let i = 0; i < count; i++) {
                                args.push(compositeArgument.getItem(i).getString());
                            }
                        }
                    }
                    executeProcess(this._path.getValue(), { args: args, verbose: true })
                        .then(code => {
                            if (code === 0) {
                                resolve();
                            }
                            else {
                                reject(new Error("Compiler failed"));
                            }
                        })
                        .catch(reject);
                }
                else {
                    reject(new Error("Compiler input file was not set"));
                }
            }
            else {
                reject(new Error("Compiler output file was not set"));
            }
        });
    }
    reset(): void {
        this.flags.splice(0, this.flags.length);
        this.defines.splice(0, this.defines.length);
        this.includeDirs.splice(0, this.includeDirs.length);
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getCC());
    }

    constructor() {
        this.flags = [];
        this.defines = [];
        this.includeDirs = [];
        this.input = undefined;
        this.output = undefined;
        this.optimization = undefined;
        this.warnings = undefined;
        this._path = new GetSetProperty<string>(ToolchainEnvironmentVariables.instance().getCC());
        this.reset();
    }
    path(): IGetSetProperty<string> {
        return this._path;
    }
}