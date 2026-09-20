import type { Media, MediaDetails } from "../../types/media";
import "./Hero.css";

interface HeroProps {
  movie: Media | null;
  details: MediaDetails | null;
}

function Hero({ movie, details }: HeroProps) {
  if (!movie) {
    return null;
  }

  const backdropImage = movie.backdrop_path ?? movie.poster_path;
  const year = (movie.release_date ?? movie.first_air_date)?.slice(0, 4);
  const genres = details?.genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(" • ");
  const runtime = details?.runtime;
  const runtimeText = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : "";

  return (
    <section className="hero">
      {backdropImage && (
        <img
          className="hero-background"
          src={`https://image.tmdb.org/t/p/original${backdropImage}`}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      )}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">{movie.title ?? movie.name}</h1>

        <p className="hero-meta">
          <span>{movie.media_type === "movie" ? "Film" : "Series"}</span>

          {genres && (
            <>
              <span className="hero-dot">•</span>
              <span>{genres}</span>
            </>
          )}

          {year && (
            <>
              <span className="hero-dot">•</span>
              <span>{year}</span>
            </>
          )}

          {runtimeText && (
            <>
              <span className="hero-dot">•</span>
              <span>{runtimeText}</span>
            </>
          )}
        </p>

        <p className="hero-description">{movie.overview}</p>

        <div className="hero-buttons">
          <button type="button" className="play-btn">
            <span aria-hidden="true">▶</span> Play
          </button>
          <button type="button" className="info-btn">
            <span aria-hidden="true"></span> More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
