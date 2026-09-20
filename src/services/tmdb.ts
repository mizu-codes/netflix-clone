import type { Media, MediaResponse, Video } from "../types/media";

function addMediaType(
  results: Omit<Media, "media_type">[],
  mediaType: "movie" | "tv",
): Media[] {
  return results.map((item) => ({
    ...item,
    media_type: mediaType,
  }));
}

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function fetchTMDB(endpoint: string) {
  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  return response.json();
}

export async function getTrendingMovies(): Promise<MediaResponse> {
  const data = await fetchTMDB("/trending/movie/week");

  return {
    ...data,
    results: addMediaType(data.results, "movie"),
  };
}

export async function getPopularMovies(): Promise<MediaResponse> {
  const data = await fetchTMDB("/movie/popular");

  return {
    ...data,
    results: addMediaType(data.results, "movie"),
  };
}

export async function getPopularTvShows(): Promise<MediaResponse> {
  const data = await fetchTMDB("/tv/popular");

  return {
    ...data,
    results: addMediaType(data.results, "tv"),
  };
}

export async function getAsianMoviesAndTv(): Promise<MediaResponse> {
  const countries = "KR|JP|CN|TH|ID|PH|TW|HK";

  const [movieData, tvData] = await Promise.all([
    fetchTMDB(
      `/discover/movie?with_origin_country=${countries}&sort_by=popularity.desc`,
    ),
    fetchTMDB(
      `/discover/tv?with_origin_country=${countries}&sort_by=popularity.desc`,
    ),
  ]);

  const movies = addMediaType(movieData.results, "movie");
  const tvShows = addMediaType(tvData.results, "tv");

  const results = [...movies, ...tvShows].sort(
    (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  );

  return {
    ...movieData,
    results,
  };
}

export async function getTopRatedMovies(): Promise<MediaResponse> {
  const data = await fetchTMDB("/movie/top_rated");

  return {
    ...data,
    results: addMediaType(data.results, "movie"),
  };
}

export async function getNetflixMoviesAndTv(): Promise<MediaResponse> {
  const [movieData, tvData] = await Promise.all([
    fetchTMDB("/discover/movie?with_companies=213&sort_by=popularity.desc"),
    fetchTMDB("/discover/tv?with_networks=213&sort_by=popularity.desc"),
  ]);

  const movies = addMediaType(movieData.results, "movie");
  const tvShows = addMediaType(tvData.results, "tv");

  const results = [...movies, ...tvShows].sort(
    (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  );

  return {
    ...movieData,
    results,
  };
}

export async function getMediaDetails(mediaType: "movie" | "tv", id: string) {
  return fetchTMDB(`/${mediaType}/${id}`);
}

export async function getMediaVideos(
  mediaType: "movie" | "tv",
  id: string,
): Promise<Video[]> {
  const data = await fetchTMDB(`/${mediaType}/${id}/videos`);

  return data.results;
}
