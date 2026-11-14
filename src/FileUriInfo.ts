import { IReadOnlyArray } from "./Util/IReadOnlyArray";
import { ReadOnlyArray } from "./Util/ReadOnlyArray";

export interface IFileUriInfo {
    getMainUri(): string | URL;
    getUriArray(): IReadOnlyArray<string | URL>;
}

export class FileUriInfo implements IFileUriInfo {
    private uriList: IReadOnlyArray<string | URL>;

    constructor(uriList: (string | URL)[]) {
        if (uriList.length <= 0) {
            throw new Error("empty array of URIs are not allowed");
        }
        this.uriList = new ReadOnlyArray<string | URL>(uriList);
    }

    getUriArray(): IReadOnlyArray<string | URL> {
        return this.uriList;
    }

    getMainUri(): string | URL {
        return this.uriList.getItem(0);
    }
}