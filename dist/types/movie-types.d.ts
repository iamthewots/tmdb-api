import type { TmdbMovieSearch } from "./search-types.js";
export type TmdbMovieDetails = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
export type TmdbMovieDetailsAppendMap = {
    alternative_titles: {
        alternative_titles: TmdbMovieAlternativeTitles;
    };
    credits: {
        credits: TmdbMovieCredits;
    };
    images: {
        images: TmdbMovieImages;
    };
    recommendations: {
        recommendations: TmdbMovieSearch;
    };
    similar: {
        similar: TmdbMovieSearch;
    };
    translations: {
        translations: TmdbMovieTranslations;
    };
};
export type AppendToTmdbMovieDetails<MovieDetails, Keys extends readonly (keyof TmdbMovieDetailsAppendMap)[]> = MovieDetails & UnionToIntersection<TmdbMovieDetailsAppendMap[Keys[number]]>;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type TmdbMovieAlternativeTitles = {
    id: number;
    titles: {
        iso_3166_1: string;
        title: string;
        type: string;
    }[];
};
export type TmdbMovieCredits = {
    id: number;
    cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
    }[];
    crew: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        credit_id: string;
        department: string;
        job: string;
    }[];
};
export type TmdbMovieImages = {
    backdrops: {
        aspect_ratio: number;
        height: number;
        iso_3166_1: string;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
    id: number;
    logos: {
        aspect_ratio: number;
        height: number;
        iso_3166_1: string;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
    posters: {
        aspect_ratio: number;
        height: number;
        iso_3166_1: string;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
    }[];
};
export type TmdbMovieTranslations = {
    id: number;
    translations: {
        iso_3166_1: string;
        iso_639_1: string;
        name: string;
        english_name: string;
        data: {
            homepage: string;
            overview: string;
            runtime: number;
            tagline: string;
            title: string;
        };
    }[];
};
export type TmdbMovieWatchProviders = {
    id: number;
    results: {
        [key: string]: {
            link: string;
        } & Record<TmdbWatchProviderOption, TmdbWatchProviderDetails>;
    };
};
export type TmdbWatchProviderOption = "buy" | "flatrate" | "rent";
export type TmdbWatchProviderDetails = {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: 3;
};
export {};
//# sourceMappingURL=movie-types.d.ts.map