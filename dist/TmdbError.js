export class TmdbError {
    message;
    statusCode;
    tmdbCode;
    constructor(message, statusCode, tmdbCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.tmdbCode = tmdbCode;
    }
    static from(error) {
        return error instanceof TmdbError
            ? error
            : new TmdbError("INTERNAL_SERVER_ERROR", 500, 11);
    }
}
//# sourceMappingURL=TmdbError.js.map