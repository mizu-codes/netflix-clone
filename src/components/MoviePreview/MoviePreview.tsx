import type { Media } from "../../types/media";
import "./MoviePreview.css";

interface MoviePreviewProps {
  movie: Media;
  trailerKey: string | null;
}

function MoviePreview({ movie, trailerKey }: MoviePreviewProps) {
  return (
    <div className="movie-preview">
      <div className="preview-video">
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1`}
            title={movie.title ?? movie.name ?? "Trailer"}
            allow="autoplay; encrypted-media"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title ?? movie.name ?? "Movie"}
          />
        )}
      </div>

      <div className="preview-content">
        <h3>{movie.title ?? movie.name}</h3>

        <div className="preview-actions">
          <button>▶</button>
          <button>＋</button>
          <button>♡</button>
        </div>

        <p>Rating: {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MoviePreview;
