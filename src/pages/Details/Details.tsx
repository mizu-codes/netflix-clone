import "./Details.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay, FaPlus, FaHeart } from "react-icons/fa";

import { getMediaDetails, getMediaVideos } from "../../services/tmdb";
import type { MediaDetails, Video } from "../../types/media";

function Details() {
  const { mediaType, id } = useParams<{
    mediaType: "movie" | "tv";
    id: string;
  }>();

  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);

  const trailerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mediaType || !id) return;

    getMediaDetails(mediaType, id)
      .then((data) => {
        console.log(data);
        setMedia(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    getMediaVideos(mediaType, id)
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mediaType, id]);

  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!media) {
    return <h1>Details not found</h1>;
  }

  const extra = media as unknown as {
    release_date?: string;
    first_air_date?: string;
    runtime?: number;
    episode_run_time?: number[];
  };

  const releaseYear = (extra.release_date ?? extra.first_air_date)?.slice(0, 4);

  const runtimeMinutes = extra.runtime ?? extra.episode_run_time?.[0];
  const runtimeLabel = runtimeMinutes
    ? `${Math.floor(runtimeMinutes / 60)}h ${runtimeMinutes % 60}m`
    : null;

  const backdropUrl = media.backdrop_path
    ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
    : undefined;

  const scrollToTrailer = () => {
    trailerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="details">
      <div
        className="details__backdrop"
        style={
          backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined
        }
      />
      <div className="details__backdrop-overlay" />

      <div className="details__content">
        <div className="details__trailer-panel">
          {trailer ? (
            <div className="trailer" ref={trailerRef}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="trailer trailer--placeholder" ref={trailerRef}>
              {backdropUrl && (
                <img
                  className="trailer__poster"
                  src={backdropUrl}
                  alt={media.title ?? media.name ?? ""}
                />
              )}
              <span className="trailer__placeholder-label">
                No trailer available
              </span>
            </div>
          )}
        </div>

        <div className="details__info">
          <h1 className="details__title">{media.title ?? media.name}</h1>

          <div className="details__meta">
            <span className="details__meta-item details__meta-item--type">
              {mediaType === "tv" ? "Series" : "Movie"}
            </span>

            {releaseYear && (
              <span className="details__meta-item">{releaseYear}</span>
            )}

            <span className="details__meta-item details__meta-item--rating">
              ★ {media.vote_average.toFixed(1)}
            </span>

            {runtimeLabel && (
              <span className="details__meta-item">{runtimeLabel}</span>
            )}

            {media.genres.length > 0 && (
              <span className="details__meta-item">
                {media.genres.map((genre) => genre.name).join(" • ")}
              </span>
            )}
          </div>

          <p className="details__overview">{media.overview}</p>

          <div className="details__actions">
            <button
              type="button"
              className="details__btn details__btn--play"
              onClick={scrollToTrailer}
              disabled={!trailer}
            >
              <FaPlay />
              <span>Play</span>
            </button>

            <button
              type="button"
              className="details__btn details__btn--icon"
              aria-label="Add to My List"
            >
              <FaPlus />
            </button>

            <button
              type="button"
              className="details__btn details__btn--icon"
              aria-label="Like"
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
