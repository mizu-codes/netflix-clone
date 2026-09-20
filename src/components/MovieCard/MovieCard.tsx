import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";

import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import type { Media } from "../../types/media";
import { getMediaVideos } from "../../services/tmdb";

import MoviePreview from "../MoviePreview/MoviePreview";
import "./MovieCard.css";

interface MovieCardProps {
  movie: Media;
}

const PREVIEW_SCALE = 1.55;
const PREVIEW_LIFT_RATIO = 0.18;
const VIEWPORT_EDGE_MARGIN = 8;

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [showPreview, setShowPreview] = useState(false);
  const [entered, setEntered] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState<CSSProperties | null>(null);

  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closePreview = useCallback(() => {
    setShowPreview(false);
    setEntered(false);
    setTrailerKey(null);
    setPreviewStyle(null);
  }, []);

  const handleMouseEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    hoverTimer.current = setTimeout(async () => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const expandedWidth = rect.width * PREVIEW_SCALE;

      const idealLeft = rect.left - (expandedWidth - rect.width) / 2;
      const left = Math.min(
        Math.max(idealLeft, VIEWPORT_EDGE_MARGIN),
        window.innerWidth - expandedWidth - VIEWPORT_EDGE_MARGIN,
      );
      const top = rect.top - rect.height * PREVIEW_LIFT_RATIO;

      setPreviewStyle({
        top: `${top}px`,
        left: `${left}px`,
        width: `${expandedWidth}px`,
      });
      setShowPreview(true);

      requestAnimationFrame(() => setEntered(true));

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

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }

    closePreview();
  }, [closePreview]);

  useEffect(() => {
    if (!showPreview) return;

    window.addEventListener("scroll", handleMouseLeave, true);

    return () => window.removeEventListener("scroll", handleMouseLeave, true);
  }, [showPreview, handleMouseLeave]);

  const handleClick = () => {
    navigate(`/details/${movie.media_type}/${movie.id}`);
  };

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.jpg";

  return (
    <div
      ref={cardRef}
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img src={imageUrl} alt={movie.title ?? movie.name ?? "Movie"} />

      {showPreview &&
        previewStyle &&
        createPortal(
          <div
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={handleMouseLeave}
          >
            <MoviePreview
              movie={movie}
              trailerKey={trailerKey}
              style={previewStyle}
              entered={entered}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}

export default MovieCard;
