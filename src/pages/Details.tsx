import "./Details.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMediaDetails,getMediaVideos } from "../services/tmdb";
import type { MediaDetails, Video } from "../types/media";

function Details() {
  const { mediaType, id } = useParams<{
    mediaType: "movie" | "tv";
    id: string;
  }>();

  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);

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

  return (
    <div className="details">
      {trailer && (
        <div className="trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <h1>{media.title ?? media.name}</h1>

      <p>{media.overview}</p>

      <p>Rating: {media.vote_average}</p>

      <div>
        {media.genres.map((genre) => (
          <span key={genre.id}>{genre.name} </span>
        ))}
      </div>
    </div>
  );
}

export default Details;
