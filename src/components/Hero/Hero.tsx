import type { Media } from "../../types/media";
import "./Hero.css";

interface HeroProps {
  movie: Media | null;
}

function Hero({ movie }: HeroProps) {
  if (!movie) {
    return null;
  }

  const backdropImage = movie.backdrop_path ?? movie.poster_path;

  return (
    <section className="hero">
      {backdropImage && (
        <img
          className="hero-background"
          src={`https://image.tmdb.org/t/p/original${backdropImage}`}
          alt=""
        />
      )}

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-n">N</span>

        <h1 className="hero-title">{movie.title ?? movie.name}</h1>

        <p className="hero-meta">
          {movie.media_type === "movie" ? "Movie" : "Series"}

          <span>•</span>

          <span>★ {movie.vote_average.toFixed(1)}</span>

          {(movie.release_date || movie.first_air_date) && (
            <>
              <span>•</span>
              <span>
                {(movie.release_date ?? movie.first_air_date)?.slice(0, 4)}
              </span>
            </>
          )}
        </p>

        <p className="hero-description">{movie.overview}</p>

        <div className="hero-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="info-btn">ⓘ More Info</button>
        </div>
      </div>
  z
    </section>
  );
}

export default Hero;
