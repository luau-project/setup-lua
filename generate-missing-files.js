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
import { EOL } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function writeMissingFile(file, program, resolve, reject) {
    writeFile(file, program.join(EOL), { encoding: "utf-8" })
        .then(() => {
            resolve(file);
        })
        .catch(reject);
}

function generateClass(config, baseClassName, githubPrefix, cliPrefix) {
    return new Promise((resolve, reject) => {
        const file = join(__dirname, "src", `${baseClassName}.ts`);
        if (config === "GITHUB") {
            const program = [
                `import { ${githubPrefix}${baseClassName} } from \"./${githubPrefix}${baseClassName}\";`,
                "",
                `export const ${baseClassName} = ${githubPrefix}${baseClassName};`
            ];
            writeMissingFile(file, program, resolve, reject);
        }
        else if (config === "CLI") {
            const program = [
                `import { ${cliPrefix}${baseClassName} } from \"./${cliPrefix}${baseClassName}\";`,
                "",
                `export const ${baseClassName} = ${cliPrefix}${baseClassName};`
            ];
            writeMissingFile(file, program, resolve, reject);
        }
        else {
            reject(new Error(`Unknown generation config: \`${config}'`));
        }
    });
}

function generateCacheService(config) {
    return generateClass(config, "CacheService", "GitHub", "Cli");
}

function generateGitHubCore(config) {
    return generateClass(config, "GitHubCore", "Native", "Cli");
}

function generateConsole(config) {
    return generateClass(config, "Console", "GitHub", "Cli");
}

function main() {
    const config = (process.argv[2] || "").trim().toUpperCase();
    generateGitHubCore(config)
        .then(gitHubCore => {
            console.log(`> \`${gitHubCore}' was generated.`);
            generateCacheService(config)
                .then(cacheService => {
                    console.log(`> \`${cacheService}' was generated.`);
                    generateConsole(config)
                        .then(_console => {
                            console.log(`> \`${_console}' was generated.`);
                        })
                        .catch(err => {
                            console.log("Failed to generate the Console");
                            console.log(err);
                            process.exitCode = 1;
                        });
                })
                .catch(err => {
                    console.log("Failed to generate the CacheService");
                    console.log(err);
                    process.exitCode = 1;
                });
        })
        .catch(err => {
            console.log("Failed to generate the GitHubCore");
            console.log(err);
            process.exitCode = 1;
        });
}

main();