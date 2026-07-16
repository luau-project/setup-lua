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

export interface ILuaJitRepositoryVersion {
    getName(): string;
    getKind(): string;
    getRepository(): string;
    getRef(): string;
    getString(): string;
}

interface ILuaJitRepositoryVersionOptions {
    name: string;
    kind: string;
    repository: string;
    ref: string;
}

interface ILuaJitRepositoryVersionFactory {
    create: (opts: ILuaJitRepositoryVersionOptions) => ILuaJitRepositoryVersion;
}

const CONVERT_LUAJIT: any = {
    "openresty": {
        name: "OpenResty",
        repository: "https://github.com/openresty/luajit2",
        ref: "v2.1-agentzh",
        create: (opts: ILuaJitRepositoryVersionOptions) => new OpenRestyRepositoryVersion(opts)
    },
    "luajit": {
        name: "LuaJIT",
        repository: "https://github.com/LuaJIT/LuaJIT",
        ref: "v2.1",
        create: (opts: ILuaJitRepositoryVersionOptions) => new LuaJitRepositoryVersion(opts)
    }
}

export function parseLuaJitRepositoryVersion(version: string): Promise<ILuaJitRepositoryVersion> {
    return new Promise<ILuaJitRepositoryVersion>((resolve, reject) => {
        if (version in CONVERT_LUAJIT) {
            const details = CONVERT_LUAJIT[version];
            const repository = <string>(details.repository);
            const name = <string>(details.name);
            const defaultBranch = <string>(details.ref);
            const create = (<ILuaJitRepositoryVersionFactory>details).create;
            resolve(create({ name: name, kind: version, repository: repository, ref: defaultBranch }));
        }
        else {
            const match = /^(openresty|luajit)\@(.*)$/.exec(version);
            if (match) {
                const kind = match[1];
                if (kind in CONVERT_LUAJIT) {
                    const details = CONVERT_LUAJIT[kind];
                    const repository = <string>(details.repository);
                    const name = <string>(details.name);
                    const ref = match[2];
                    const create = (<ILuaJitRepositoryVersionFactory>details).create;
                    resolve(create({ name: name, kind: kind, repository: repository, ref: ref }));
                }
                else {
                    reject(new Error("Internal error: unexpected condition to convert LuaJIT / OpenResty version to the proper repository"));
                }
            }
            else {
                reject(new Error("Unknown format for the LuaJIT / OpenResty version"));
            }
        }
    });
}

export class LuaJitBaseRepositoryVersion implements ILuaJitRepositoryVersion {
    private options: ILuaJitRepositoryVersionOptions;

    getName(): string {
        return this.options.name;
    }

    getKind(): string {
        return this.options.kind;
    }

    getRepository(): string {
        return this.options.repository;
    }

    getRef(): string {
        return this.options.ref;
    }

    getString(): string {
        return this.options.ref;
    }

    protected constructor(opts: ILuaJitRepositoryVersionOptions) {
        this.options = {
            name: opts.name,
            kind: opts.kind,
            repository: opts.repository,
            ref: opts.ref
        };
    }
}

export class LuaJitRepositoryVersion extends LuaJitBaseRepositoryVersion {
    constructor(opts: ILuaJitRepositoryVersionOptions) {
        super(opts);
    }
}

export class OpenRestyRepositoryVersion extends LuaJitBaseRepositoryVersion {
    constructor(opts: ILuaJitRepositoryVersionOptions) {
        super(opts);
    }
}