export class TmdbError {
    message;
    statusCode;
    tmdbCode;
    url;
    constructor(message, statusCode, tmdbCode, url) {
        this.message = message;
        this.statusCode = statusCode;
        this.tmdbCode = tmdbCode;
        this.url = url;
    }
    static from(error) {
        return error instanceof TmdbError
            ? error
            : new TmdbError("INTERNAL_SERVER_ERROR", 500, 11);
    }
}
//# sourceMappingURL=TmdbError.js.map