import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieRow from "../components/MovieRow/MovieRow";
import Footer from "../components/Footer/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getPopularTvShows,
  getTopRatedMovies,
  getLatestMovies,
} from "../services/tmdb";

import type { Media } from "../types/media";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<Media[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Media[]>([]);
  const [latestMovies, setLatestMovies] = useState<Media[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Media | null>(null);

  useEffect(() => {
    getTrendingMovies()
      .then(async (data) => {
        setTrendingMovies(data.results);

        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];

        setFeaturedMovie(randomMovie);
      })
      .catch((error) => {
        console.error(error);
      });

    getPopularMovies()
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    getPopularTvShows()
      .then((data) => {
        setPopularTvShows(data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    getTopRatedMovies()
      .then((data) => {
        setTopRatedMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    getLatestMovies()
      .then((data) => {
        setLatestMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Hero movie={featuredMovie} />
      <MovieRow title="Trending Now" movies={trendingMovies} />
      <MovieRow title="Popular Movies" movies={popularMovies} />
      <MovieRow title="Popular TV Shows" movies={popularTvShows} />
      <MovieRow title="Top Rated" movies={topRatedMovies} />
      <MovieRow title="Latest Releases" movies={latestMovies} />
      <Footer />
    </>
  );
}

export default Home;
