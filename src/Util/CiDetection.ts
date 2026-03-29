export function isRunningOnCi(): boolean {
    return (
        (
            process.env["CI"] ||
            process.env["GITHUB_ACTIONS"] ||
            ""
        ).toLowerCase() === "true");
}