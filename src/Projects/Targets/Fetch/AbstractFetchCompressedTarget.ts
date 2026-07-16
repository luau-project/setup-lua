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

import { basename, join } from "node:path";
import { IProject } from "../../IProject";
import { ITarget } from "../ITarget";
import { downloadFile } from "../../../Util/DownloadFile";
import { verifyFileHash } from "../../../Util/FileHash";
import { CacheService } from "../../../CacheService";

export interface CompressedExpectedHash {
    algorithm: string;
    expectedHash: string;
}

export interface FetchCompressedTargetOptions {
    maxTries?: number;
    filename?: string;
    fileHash?: CompressedExpectedHash;
}

export interface ExtractOptions {
    cwd?: string;
    verbose?: boolean;
}

export abstract class AbstractFetchCompressedTarget implements ITarget {
    private url: string | URL;
    private workDir: string;
    private cacheKey: string | null;
    private handler: (filename: string, opts?: ExtractOptions) => Promise<number | null>;
    private opts: FetchCompressedTargetOptions;

    getUrl(): string | URL {
        return this.url;
    }

    getWorkDir(): string {
        return this.workDir;
    }

    getCacheKey(): string | null {
        return this.cacheKey;
    }

    constructor(url: string | URL, workDir: string, cacheKey: string | null, handler: (filename: string, opts?: ExtractOptions) => Promise<number | null>, opts?: FetchCompressedTargetOptions) {
        this.url = url;
        this.workDir = workDir;
        this.cacheKey = cacheKey;
        this.handler = handler;
        this.opts = {};
        this.opts.filename = opts?.filename ?? basename(url.toString());
        this.opts.maxTries = opts?.maxTries;
        if (opts?.fileHash) {
            this.opts.fileHash = {
                algorithm: opts.fileHash.algorithm,
                expectedHash: opts.fileHash.expectedHash
            };
        }
    }
    abstract init(): Promise<void>;
    abstract getProject(): IProject;
    abstract getParent(): ITarget | null;
    abstract getNext(): ITarget | null;
    private processArchive(file: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const fileHash = this.opts.fileHash;
            if (fileHash) {
                verifyFileHash(file, fileHash.algorithm, fileHash.expectedHash)
                    .then(match => {
                        if (match) {
                            this.handler(file, { cwd: this.workDir, verbose: true })
                                .then(code => {
                                    if (code === 0) {
                                        resolve();
                                    }
                                    else {
                                        reject(new Error(`Failed to extract ${basename(file)}`));
                                    }
                                })
                                .catch(reject);
                        }
                        else {
                            reject(new Error("File hash mismatch"));
                        }
                    })
                    .catch(reject);
            }
            else {
                this.handler(file, { cwd: this.workDir, verbose: true })
                    .then(code => {
                        if (code === 0) {
                            resolve();
                        }
                        else {
                            reject(new Error(`Failed to extract ${basename(file)}`));
                        }
                    })
                    .catch(reject);
            }
        });
    }
    private saveOnCache(file: string, useCache: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.processArchive(file)
                .then(() => {
                    if (useCache && this.cacheKey !== null) {
                        CacheService.instance().save(file, this.cacheKey)
                            .then(resolve)
                            .catch(() => {
                                resolve();
                            });
                    }
                    else {
                        resolve();
                    }
                })
                .catch(reject);
        });
    }
    execute(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const filename = <string>this.opts.filename;
            const outFile = join(this.workDir, filename);
            const performDownload = (useCache: boolean) => {
                downloadFile(this.url, outFile, this.opts.maxTries)
                    .then(file => {
                        this.saveOnCache(file, useCache)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(reject);
            };
            if (CacheService.instance().useCache() && this.cacheKey !== null) {
                CacheService.instance().restore(outFile, this.cacheKey)
                    .then(() => {
                        this.processArchive(outFile)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(err => {
                        performDownload(true);
                    });
            }
            else {
                performDownload(false);
            }
        });
    }
    abstract finalize(): Promise<void>;
}