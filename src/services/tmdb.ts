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

export async function getTopRatedMovies(): Promise<MediaResponse> {
  const data = await fetchTMDB("/movie/top_rated");

  return {
    ...data,
    results: addMediaType(data.results, "movie"),
  };
}

export async function getLatestMovies(): Promise<MediaResponse> {
  const data = await fetchTMDB("/movie/now_playing");

  return {
    ...data,
    results: addMediaType(data.results, "movie"),
  };
}

export async function getMediaDetails(mediaType: "movie" | "tv", id: string) {
  return fetchTMDB(`/${mediaType}/${id}`);
}

export async function getMediaVideos(
  mediaType: "movie" | "tv",
  id: string
): Promise<Video[]> {
  const data = await fetchTMDB(`/${mediaType}/${id}/videos`);

  return data.results;
}
