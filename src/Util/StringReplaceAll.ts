export function replaceAll(input: string, target: string, replacement: string): string {
    const l = input.length;
    const tl = target.length;
    const tokens: string[] = [];

    if (l > 0) {
        let i = 0;
        let s = 0;
        while (i < l) {
            if (input.startsWith(target, i)) {
                tokens.push(input.substring(s, i));
                tokens.push(replacement);
                i += tl;
                s = i;
            }
            else {
                i++;
            }
        }

        tokens.push(input.substring(s));
    }

    return tokens.join("");
}