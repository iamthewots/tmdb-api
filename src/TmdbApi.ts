import { TmdbError } from "./TmdbError.js";
import type { TmdbQueryParams, TmdbResponse } from "./types/api-types.js";
import type { TmdbCountriesConfiguration } from "./types/configuration-types.js";
import type { TmdbErrorMessage } from "./types/error-types.js";
import type { TmdbMovieGenresList } from "./types/genres-types.js";
import {
  type TmdbMovieCredits,
  type TmdbMovieImages,
  type AppendToTmdbMovieDetails,
  type TmdbMovieDetails,
  type TmdbMovieDetailsAppendMap,
  type TmdbMovieAlternativeTitles,
  type TmdbMovieTranslations,
  type TmdbMovieWatchProviders,
} from "./types/movie-types.js";
import type { TmdbMovieSearch } from "./types/search-types.js";

export class TmdbApi {
  baseUrl = "https://api.themoviedb.org/3";

  constructor(
    private _apiKey: string,
    private _language?: string,
  ) {}

  configuration = {
    fetchCountries: async (params: TmdbQueryParams) => {
      const url = `${this.baseUrl}/configuration/countries`;
      const response = await this.fetchTmdb<TmdbCountriesConfiguration>(
        url,
        params,
      );

      return response;
    },
  };

  genres = {
    fetchMoviesList: async (params: TmdbQueryParams) => {
      const url = `${this.baseUrl}/genre/movie/list`;
      const response = await this.fetchTmdb<TmdbMovieGenresList>(url, params);

      return response;
    },
  };

  movie = {
    fetchAlternativeTitles: async (
      movieId: number,
      params: TmdbQueryParams<{ country?: string }> = {},
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}/alternative_titles`;
      const response = await this.fetchTmdb<TmdbMovieAlternativeTitles>(
        url,
        params,
      );

      return response;
    },

    fetchCredits: async (movieId: number, params?: TmdbQueryParams) => {
      const url = `${this.baseUrl}/movie/${movieId}/credits`;
      const response = await this.fetchTmdb<TmdbMovieCredits>(url, params);

      return response;
    },

    fetchMovieDetails: async <
      A extends readonly (keyof TmdbMovieDetailsAppendMap)[],
    >(
      movieId: number,
      append: A,
      params: TmdbQueryParams<{
        append_to_response?: string;
        include_image_language?: string[];
      }> = {},
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}`;

      if (append.length > 0 && !params.append_to_response) {
        params.append_to_response = append.join(",");
      }

      const response = await this.fetchTmdb<
        AppendToTmdbMovieDetails<TmdbMovieDetails, A>
      >(url, params);

      return response;
    },

    fetchImages: async (
      movieId: number,
      params?: TmdbQueryParams<{ include_image_language?: string[] }>,
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}/images`;
      const response = await this.fetchTmdb<TmdbMovieImages>(url, params);

      return response;
    },

    fetchMovieRecommendations: async (
      movieId: number,
      params: TmdbQueryParams<{ page: number }>,
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}/recommendations`;
      const response = await this.fetchTmdb<TmdbMovieSearch>(url, params);

      return response;
    },

    fetchSimilar: async (
      movieId: number,
      params: TmdbQueryParams<{ page: number }>,
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}/similar`;
      const response = await this.fetchTmdb<TmdbMovieSearch>(url, params);

      return response;
    },

    fetchTranslations: async (
      movieId: number,
      params: TmdbQueryParams = {},
    ) => {
      const url = `${this.baseUrl}/movie/${movieId}/translations`;
      const response = await this.fetchTmdb<TmdbMovieTranslations>(url, params);

      return response;
    },

    fetchWatchProviders: async (movieId: number, params?: TmdbQueryParams) => {
      const url = `${this.baseUrl}/movie/${movieId}/providers`;
      const response = await this.fetchTmdb<TmdbMovieWatchProviders>(
        url,
        params,
      );

      return response;
    },
  };

  search = {
    movie: async (
      params: TmdbQueryParams<{
        query: string;
        page: number;
        include_adult?: boolean;
        primary_release_year?: boolean;
        region?: string;
        year?: string;
      }>,
    ) => {
      const url = `${this.baseUrl}/search/movie`;
      const response = await this.fetchTmdb<TmdbMovieSearch>(url, params);

      return response;
    },
  };

  private async fetchTmdb<T>(
    url: string,
    params?: any,
  ): Promise<TmdbResponse<T>> {
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

      return { success: true, json: json as T };
    } catch (error) {
      return { success: false, error: TmdbError.from(error) };
    }
  }

  get language() {
    return this._language ?? "en-US";
  }
}
