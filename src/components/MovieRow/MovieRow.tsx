import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";
import type { Media } from "../../types/media";

interface MovieRowProps {
  title: string;
  movies: Media[];
}

function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;