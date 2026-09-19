import "./MovieCard.css";

interface MovieCardProps {
  title: string;
  image: string;
}

function MovieCard({ title, image }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img src={image} alt={title} />
    </div>
  );
}

export default MovieCard;
