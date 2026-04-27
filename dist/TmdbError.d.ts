import type { TmdbErrorMessage } from "./types/error-types.js";
export declare class TmdbError {
    message: TmdbErrorMessage;
    statusCode: number;
    tmdbCode: number;
    constructor(message: TmdbErrorMessage, statusCode: number, tmdbCode: number);
    static from(error: any): TmdbError;
}
//# sourceMappingURL=TmdbError.d.ts.map