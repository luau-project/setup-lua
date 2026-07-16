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

import { basename } from "node:path";
import { cp, rm } from "node:fs/promises";
import { saveCache, restoreCache } from "@actions/cache";
import { GitHubInput } from "./Util/GitHubInput";
import { ICacheService } from "./Util/ICacheService";

export class GitHubCacheService implements ICacheService {
    private static _instance: ICacheService;
    static instance(): ICacheService {
        if (!GitHubCacheService._instance) {
                GitHubCacheService._instance = new GitHubCacheService();
        }
        return GitHubCacheService._instance;
    }
    private getPathForGitHubCache(path: string): string {
        return `setup-lua-cache-${basename(path)}`;
    }
    useCache(): boolean {
        return GitHubInput.instance().getInputUseCache();
    }
    save(path: string, key: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const pathForCache = this.getPathForGitHubCache(path);
            cp(path, pathForCache, { force: true })
                .then(() => {
                    saveCache([pathForCache], key, undefined, true)
                        .then(_ => {
                            rm(pathForCache, { force: true })
                                .then(resolve)
                                .catch(rmErr => {
                                    resolve();
                                });
                        })
                        .catch(saveErr => {
                            rm(pathForCache, { force: true })
                                .then(() => {
                                    reject(saveErr);
                                })
                                .catch(rmErr => {
                                    resolve(saveErr);
                                });
                        });
                })
                .catch(reject);
        });
    }
    restore(path: string, primaryKey: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const pathForCache = this.getPathForGitHubCache(path);
            restoreCache([pathForCache], primaryKey, undefined, undefined, true)
                .then(cacheKey => {
                    if (cacheKey) {
                        cp(pathForCache, path, { force: true })
                            .then(() => {
                                rm(pathForCache, { force: true })
                                    .then(resolve)
                                    .catch(rmErr => {
                                        resolve();
                                    });
                            })
                            .catch(reject);
                    }
                    else {
                        rm(pathForCache, { force: true })
                            .then(() => {
                                reject(new Error(`There is no cache available for ${primaryKey}.`));
                            })
                            .catch(rmErr => {
                                reject(new Error(`There is no cache available for ${primaryKey}.`));
                            });
                    }
                })
                .catch(reject);
        });
    }
    private constructor() {

    }
}