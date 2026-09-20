import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";
import type { Media } from "../../types/media";

interface MovieRowProps {
  title: string;
  movies: Media[];
}

function MovieRow({ title, movies }: MovieRowProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = listRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 2);
  };

  useLayoutEffect(() => {
    updateScrollButtons();
  }, [movies]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = listRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-row__track">
        {canScrollLeft && (
          <button
            type="button"
            className="movie-row__arrow movie-row__arrow--left"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollByDirection("left")}
          >
            <FaChevronLeft size={42} />
          </button>
        )}

        <div className="movie-list" ref={listRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="movie-row__arrow movie-row__arrow--right"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollByDirection("right")}
          >
            <FaChevronRight size={42} />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieRow;
