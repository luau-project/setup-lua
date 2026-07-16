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

import { ToolchainEnvironmentVariables } from "../ToolchainEnvironmentVariables";
import { executeProcess } from "../../Util/ExecuteProcess";
import { GetSetProperty } from "../../Util/GetSetProperty";
import { IGetSetProperty } from "../../Util/IGetSetProperty";
import { IStrip } from "../IStrip";
import { IToolchainCompositeArgument } from "../IToolchainCompositeArgument";
import { ToolchainCompositeArgument } from "../ToolchainCompositeArgument";
import { ToolchainRawArgument } from "../ToolchainRawArgument";

export class GccStrip implements IStrip {
    private _path: IGetSetProperty<string>;
    private flags: IToolchainCompositeArgument[];
    private input?: IToolchainCompositeArgument;

    addFlag(value: string): void {
        this.flags.push(
            new ToolchainCompositeArgument(
                [new ToolchainRawArgument(value)]
            )
        );
    }
    addStripAll(): void {
        this.addFlag("--strip-all");
    }
    addStripUnneeded(): void {
        this.addFlag("--strip-unneeded");
    }
    setInputFile(path: string): void {
        this.input = new ToolchainCompositeArgument(
            [new ToolchainRawArgument(path)]
        );
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.input) {
                const args: string[] = [];
                const arrays: IToolchainCompositeArgument[][] = [this.flags, [this.input]];
                for (const arrayElement of arrays) {
                    for (const commandLineArgument of arrayElement) {
                        const count = commandLineArgument.getLenght();
                        for (let i = 0; i < count; i++) {
                            args.push(commandLineArgument.getItem(i).getString());
                        }
                    }
                }
                executeProcess(this._path.getValue(), { args: args, verbose: true })
                    .then(code => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error("Strip failed"));
                        }
                    })
                    .catch(reject);
            }
            else {
                reject(new Error("Strip input file was not set"));
            }
        });
    }
    reset(): void {
        this.flags.splice(0, this.flags.length);
        this.input = undefined;
        this._path.setValue(ToolchainEnvironmentVariables.instance().getSTRIP());
    }

    constructor() {
        this.flags = [];
        this.input = undefined;
        this._path = new GetSetProperty<string>(ToolchainEnvironmentVariables.instance().getSTRIP());
        this.reset();
    }
    path(): IGetSetProperty<string> {
        return this._path;
    }
}