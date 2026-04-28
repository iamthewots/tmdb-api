import { TmdbError } from "./TmdbError.js";
import {} from "./types/movie-types.js";
export class TmdbApi {
    _apiKey;
    _language;
    baseUrl = "https://api.themoviedb.org/3";
    constructor(_apiKey, _language) {
        this._apiKey = _apiKey;
        this._language = _language;
    }
    async testApiKey() {
        const url = `${this.baseUrl}/authenticatio`;
        const response = await this.fetchTmdb(url);
        return response.success;
    }
    configuration = {
        fetchCountries: async (params) => {
            const url = `${this.baseUrl}/configuration/countries`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
    };
    genres = {
        fetchMoviesList: async (params) => {
            const url = `${this.baseUrl}/genre/movie/list`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
    };
    movie = {
        fetchAlternativeTitles: async (movieId, params = {}) => {
            const url = `${this.baseUrl}/movie/${movieId}/alternative_titles`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchCredits: async (movieId, params) => {
            const url = `${this.baseUrl}/movie/${movieId}/credits`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchMovieDetails: async (movieId, append, params = {}) => {
            const url = `${this.baseUrl}/movie/${movieId}`;
            if (append.length > 0 && !params.append_to_response) {
                params.append_to_response = append.join(",");
            }
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchImages: async (movieId, params) => {
            const url = `${this.baseUrl}/movie/${movieId}/images`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchMovieRecommendations: async (movieId, params) => {
            const url = `${this.baseUrl}/movie/${movieId}/recommendations`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchSimilar: async (movieId, params) => {
            const url = `${this.baseUrl}/movie/${movieId}/similar`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchTranslations: async (movieId, params = {}) => {
            const url = `${this.baseUrl}/movie/${movieId}/translations`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
        fetchWatchProviders: async (movieId, params) => {
            const url = `${this.baseUrl}/movie/${movieId}/providers`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
    };
    search = {
        movie: async (params) => {
            const url = `${this.baseUrl}/search/movie`;
            const response = await this.fetchTmdb(url, params);
            return response;
        },
    };
    async fetchTmdb(url, params) {
        const finalParams = {
            language: this.language,
            ...params,
        };
        const finalUrl = `${url}?${new URLSearchParams(finalParams)}`;
        try {
            const response = await fetch(finalUrl, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${this._apiKey}`,
                },
            });
            const json = await response.json();
            if (response.status !== 200) {
                switch (json.status_code) {
                    case 5:
                        throw new TmdbError("INVALID_SEARCH_PARAMS", 422, 5, finalUrl);
                    case 6:
                        throw new TmdbError("INVALID_MOVIE_ID", 400, 6, finalUrl);
                    case 9:
                        throw new TmdbError("API_DOWN", 503, 9, finalUrl);
                    case 10:
                        throw new TmdbError("API_ACCESS_SUSPENDED", 503, 10, finalUrl);
                    case 11:
                    default:
                        throw new TmdbError("INTERNAL_SERVER_ERROR", 500, 11, finalUrl);
                }
            }
            return { success: true, json: json };
        }
        catch (error) {
            return { success: false, error: TmdbError.from(error) };
        }
    }
    get language() {
        return this._language ?? "en-US";
    }
}
//# sourceMappingURL=TmdbApi.js.map