import { readFile, writeFile } from "node:fs/promises";
import { replaceAll } from "./StringReplaceAll";

interface ReplacementCallback {
    (input: string, targetStr: string, replacementStr: string): string;
}

function replaceFirst(input: string, targetStr: string, replacementStr: string): string {
    return input.replace(targetStr, replacementStr);
}

function replacementInFile(
    callback: ReplacementCallback,
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        readFile(filePath, { encoding: encoding })
            .then(content => {
                if (numberOfLinesToSkip === 0) {
                    const newContent = callback(content.toString(), targetStr, replacementStr);
                    writeFile(filePath, newContent, { encoding: encoding })
                        .then(resolve)
                        .catch(reject);
                }
                else {
                    const s = content.toString();
                    const rgx = /\r?\n/g;
                    let match: RegExpExecArray | null;
                    let foundStart: boolean = false;

                    let i: number = 0;
                    let index: number = 0;
                    while (!foundStart && (match = rgx.exec(s)) != null) {
                        index = match.index + match[0].length;
                        i++;
                        foundStart = i == numberOfLinesToSkip;
                    }

                    if (foundStart) {
                        const newContent = s.substring(0, index) + callback(s.substring(index), targetStr, replacementStr);
                        writeFile(filePath, newContent, { encoding: encoding })
                            .then(resolve)
                            .catch(reject);
                    }
                    else {
                        resolve();
                    }
                }
            })
            .catch(reject);
    });
}

export function replaceFirstInFile(
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return replacementInFile(replaceFirst, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}

export function replaceAllInFile(
    filePath: string,
    numberOfLinesToSkip: number,
    targetStr: string,
    replacementStr: string,
    encoding?: BufferEncoding
): Promise<void> {
    return replacementInFile(replaceAll, filePath, numberOfLinesToSkip, targetStr, replacementStr, encoding);
}