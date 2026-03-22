import { dirname, join } from "node:path";
import { checkFiles } from "./CheckFiles";

export function getCygpathFromCygwin(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const shell = (process.env["SHELL"] || "").trim();
        const shellDir = dirname(shell);
        const cygPath = join(shellDir, "cygpath.exe");
        checkFiles([cygPath])
            .then(() => {
                resolve(cygPath);
            })
            .catch(reject);
    });
}
