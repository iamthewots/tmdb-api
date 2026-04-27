import type { TmdbErrorMessage } from "./types/error-types.js";
export declare class TmdbError {
    message: TmdbErrorMessage;
    statusCode: number;
    tmdbCode: number;
    url?: string | undefined;
    constructor(message: TmdbErrorMessage, statusCode: number, tmdbCode: number, url?: string | undefined);
    static from(error: any): TmdbError;
}
//# sourceMappingURL=TmdbError.d.ts.map