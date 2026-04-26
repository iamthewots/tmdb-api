import type { TmdbErrorMessage } from "./types/error-types.js";

export class TmdbError {
  constructor(
    public message: TmdbErrorMessage,
    public statusCode: number,
    public tmdbCode: number,
  ) {}

  static from(error: any) {
    return error instanceof TmdbError
      ? error
      : new TmdbError("INTERNAL_SERVER_ERROR", 500, 11);
  }
}
