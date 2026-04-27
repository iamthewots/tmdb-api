import type { TmdbQueryParams, TmdbResponse } from "./types/api-types.js";
import type { TmdbCountriesConfiguration } from "./types/configuration-types.js";
import type { TmdbMovieGenresList } from "./types/genres-types.js";
import { type TmdbMovieCredits, type TmdbMovieImages, type AppendToTmdbMovieDetails, type TmdbMovieDetails, type TmdbMovieDetailsAppendMap, type TmdbMovieAlternativeTitles, type TmdbMovieTranslations, type TmdbMovieWatchProviders } from "./types/movie-types.js";
import type { TmdbMovieSearch } from "./types/search-types.js";
export declare class TmdbApi {
    private _apiKey;
    private _language?;
    baseUrl: string;
    constructor(_apiKey: string, _language?: string | undefined);
    configuration: {
        fetchCountries: (params: TmdbQueryParams) => Promise<TmdbResponse<TmdbCountriesConfiguration>>;
    };
    genres: {
        fetchMoviesList: (params: TmdbQueryParams) => Promise<TmdbResponse<TmdbMovieGenresList>>;
    };
    movie: {
        fetchAlternativeTitles: (movieId: number, params?: TmdbQueryParams<{
            country?: string;
        }>) => Promise<TmdbResponse<TmdbMovieAlternativeTitles>>;
        fetchCredits: (movieId: number, params?: TmdbQueryParams) => Promise<TmdbResponse<TmdbMovieCredits>>;
        fetchMovieDetails: <A extends readonly (keyof TmdbMovieDetailsAppendMap)[]>(movieId: number, append: A, params?: TmdbQueryParams<{
            append_to_response?: string;
            include_image_language?: string[];
        }>) => Promise<TmdbResponse<AppendToTmdbMovieDetails<TmdbMovieDetails, A>>>;
        fetchImages: (movieId: number, params?: TmdbQueryParams<{
            include_image_language?: string[];
        }>) => Promise<TmdbResponse<TmdbMovieImages>>;
        fetchMovieRecommendations: (movieId: number, params: TmdbQueryParams<{
            page: number;
        }>) => Promise<TmdbResponse<TmdbMovieSearch>>;
        fetchSimilar: (movieId: number, params: TmdbQueryParams<{
            page: number;
        }>) => Promise<TmdbResponse<TmdbMovieSearch>>;
        fetchTranslations: (movieId: number, params?: TmdbQueryParams) => Promise<TmdbResponse<TmdbMovieTranslations>>;
        fetchWatchProviders: (movieId: number, params?: TmdbQueryParams) => Promise<TmdbResponse<TmdbMovieWatchProviders>>;
    };
    search: {
        movie: (params: TmdbQueryParams<{
            query: string;
            page: number;
            include_adult?: boolean;
            primary_release_year?: boolean;
            region?: string;
            year?: string;
        }>) => Promise<TmdbResponse<TmdbMovieSearch>>;
    };
    private fetchTmdb;
    get language(): string;
}
//# sourceMappingURL=TmdbApi.d.ts.map