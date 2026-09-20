import { useEffect, useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import MovieRow from "../components/MovieRow/MovieRow";
import Footer from "../components/Footer/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getPopularTvShows,
  getNetflixMoviesAndTv,
  getAsianMoviesAndTv,
  getMediaDetails,
} from "../services/tmdb";

import type { Media, MediaDetails } from "../types/media";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([]);
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularTvShows, setPopularTvShows] = useState<Media[]>([]);
  const [asianMoviesAndTv, setAsianMoviesAndTv] = useState<Media[]>([]);
  const [netflixMoviesAndTv, setNetflixMoviesAndTv] = useState<Media[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Media | null>(null);
  const [featuredDetails, setFeaturedDetails] = useState<MediaDetails | null>(
    null,
  );

  useEffect(() => {
    getTrendingMovies()
      .then(async (data) => {
        setTrendingMovies(data.results);

        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];

        setFeaturedMovie(randomMovie);

        const details = await getMediaDetails(
          randomMovie.media_type,
          String(randomMovie.id),
        );

        setFeaturedDetails(details);
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

    getAsianMoviesAndTv()
      .then((data) => {
        setAsianMoviesAndTv(data.results);
      })
      .catch((error) => {
        console.error(error);
      });

    getNetflixMoviesAndTv()
      .then((data) => {
        setNetflixMoviesAndTv(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Hero movie={featuredMovie} details={featuredDetails} />
      <MovieRow title="Trending Now" movies={trendingMovies} />
      <MovieRow title="Popular TV Shows" movies={popularTvShows} />
      <MovieRow title="Popular Movies" movies={popularMovies} />
      <MovieRow title="Asian Movies & TV" movies={asianMoviesAndTv} />
      <MovieRow title="Only on Netflix" movies={netflixMoviesAndTv} />
      <Footer />
    </>
  );
}

export default Home;
