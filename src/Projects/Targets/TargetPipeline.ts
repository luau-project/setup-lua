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

import { ITarget } from "./ITarget";
import { ITargetPipeline } from "./ITargetPipeline";

export class TargetPipeline implements ITargetPipeline {
    private initialTarget: ITarget;

    constructor(initialTarget: ITarget) {
        this.initialTarget = initialTarget;
    }

    init(): Promise<ITarget> {
        return new Promise<ITarget>((resolve, reject) => {
            resolve(this.initialTarget);
        });
    }
    finalize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let failed = false;
            let finished = false;
            let err: any;

            this.init()
                .then(tgt => {
                    const iter = (target: ITarget) => {
                        if (!(failed || finished)) {
                            target.init()
                                .then(() => {
                                    target.execute()
                                        .then(() => {
                                            target.finalize()
                                                .then(() => {
                                                    const nextTarget = target.getNext();

                                                    if (!nextTarget) {
                                                        finished = true;
                                                    }

                                                    iter(<ITarget>nextTarget);
                                                })
                                                .catch(finalizeErr => {
                                                    failed = true;
                                                    err = finalizeErr;
                                                    iter(target);
                                                });
                                        })
                                        .catch(execErr => {
                                            target.finalize()
                                                .then(() => {
                                                    failed = true;
                                                    err = execErr;
                                                    iter(target);
                                                })
                                                .catch(finalizeErr => {
                                                    failed = true;
                                                    err = finalizeErr;
                                                    iter(target);
                                                });
                                        });
                                })
                                .catch(initErr => {
                                    failed = true;
                                    err = initErr;
                                    iter(target);
                                });
                        }
                        else if (err) {
                            this.finalize()
                                .then(() => {
                                    reject(err);
                                })
                                .catch(reject);
                        }
                        else {
                            this.finalize()
                                .then(resolve)
                                .catch(reject);
                        }
                    };

                    iter(tgt);
                })
                .catch(reject);
        });
    }
}