import { isRunningOnCi } from "./CiDetection";

export function isCygwin(): boolean {
    return ((process.env["MSYSTEM"] || "").trim() !== "");
}

export function isCygwinOnCI(): boolean {
    return isCygwin() && isRunningOnCi();
}