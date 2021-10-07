import { useCallback, useEffect, useState } from "react";

// components
import MovieCard from "./MovieCard";

// types
import { Movie } from "types/movies.type";

interface MovieListProps {
  movieData: Movie[];
}

const MovieList = ({ movieData = [] }: MovieListProps): JSX.Element => {
  const [selectedMoviesID, updateSelectedMovies] = useState<number[]>([]);
  const [movieList, updateMovieList] = useState<Movie[]>([]);
  const [order, setOrder] = useState("asc");
  /**
   * On page load, get the persisted state.
   */
  useEffect(() => {
    const persistedState = localStorage.getItem("movieList");
    console.log("persistedState", persistedState);

    if (persistedState) {
      const parsedState: number[] = JSON.parse(persistedState);
      if (parsedState && parsedState.length) {
        updateSelectedMovies(parsedState);
      }
    }
  }, []);

  /**
   * Listen for state change.
   */
  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(selectedMoviesID));
  }, [selectedMoviesID]);

  useEffect(() => {
    let results = [...movieData];
    if (order === "desc") {
      results = results.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      results = results.sort((a, b) => b.vote_average - a.vote_average);
    }
    updateMovieList(results);
  }, [movieData, order]);

  const selectMovie = (movieId: number) => {
    const movieIndexId = selectedMoviesID.indexOf(movieId);
    if (movieIndexId === -1) {
      updateSelectedMovies((selectedMovies: number[]) => [
        ...selectedMovies,
        movieId,
      ]);
    } else {
      updateSelectedMovies(selectedMoviesID.slice(0, movieIndexId));
    }
  };

  const isSelected = (id: number): boolean =>
    selectedMoviesID.indexOf(id) !== -1;
  const switchOrder = order === "asc" ? "desc" : "asc";
  return (
    <section className="uk-section uk-section-default">
      <div className="uk-container uk-container">
        <button
          className="uk-button uk-button-secondary uk-margin"
          onClick={() => setOrder(switchOrder)}
        >
          Sort
          {order === "asc" ? (
            <span uk-icon="arrow-down" />
          ) : (
            <span uk-icon="arrow-up" />
          )}
        </button>
        <div
          className="uk-grid-small uk-grid-match uk-child-width-1-2@s uk-child-width-1-4@m"
          data-uk-grid
        >
          {movieList.map((movie) => (
            <MovieCard
              movie={movie}
              isSelected={isSelected}
              selectMovie={selectMovie}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
