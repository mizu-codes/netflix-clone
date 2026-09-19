import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

interface Movie {
  title: string;
  image: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            image={movie.image}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
