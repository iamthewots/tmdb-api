import type { TmdbError } from "../TmdbError.js";

export type TmdbResponse<T> =
  | { success: true; json: T }
  | { success: false; error: TmdbError };

export type TmdbQueryParams<T = {}> = T & {
  language?: string;
};
