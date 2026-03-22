export function isCygwin(): boolean {
    return ((process.env["MSYSTEM"] || "").trim() !== "");
}

export function isCygwinOnGitHubAction(): boolean {
    return isCygwin() && (process.env["RUNNER_OS"] === "Windows");
}