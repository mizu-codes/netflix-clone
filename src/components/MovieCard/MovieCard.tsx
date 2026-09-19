import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Media } from "../../types/media";
import { getMediaVideos } from "../../services/tmdb";

import MoviePreview from "../MoviePreview/MoviePreview";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Media;
}

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const [showPreview, setShowPreview] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(async () => {
      setShowPreview(true);

      try {
        const videos = await getMediaVideos(movie.media_type, String(movie.id));

        const trailer = videos.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );

        setTrailerKey(trailer?.key ?? null);
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
        setTrailerKey(null);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    setShowPreview(false);
    setTrailerKey(null);
  };

  const handleClick = () => {
    navigate(`/details/${movie.media_type}/${movie.id}`);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.jpg"
        }
        alt={movie.title ?? movie.name ?? "Movie"}
      />

      {showPreview && <MoviePreview movie={movie} trailerKey={trailerKey} />}
    </div>
  );
}

export default MovieCard;
