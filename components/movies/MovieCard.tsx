import Link from "next/link";
import Image from "next/image";

// components
import StarIcon from "components/icons/StarIcon";

// types
import { Movie } from "types/movies.type";

interface MovieCardProps {
  movie: Movie;
  selectMovie: (movieId: number) => void;
  isSelected: (movieId: number) => boolean;
}

const displayYear = (date: string): number => new Date(date).getFullYear();

const MovieCard = ({
  isSelected,
  movie,
  selectMovie,
}: MovieCardProps): JSX.Element => {
  const isMovieSelected = isSelected(movie.id);
  return (
    <div key={movie.id}>
      <div
        className={`uk-card uk-card-${isMovieSelected ? "primary" : "default"}`}
      >
        <div className="uk-card-media-left uk-padding-small">
          <Image
            src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
            alt={movie.title}
            width={220}
            height={330}
            layout="responsive"
          />
        </div>
        <div className="uk-card-body uk-padding-small">
          <Link href={`https://www.themoviedb.org/movie/${movie.id}`}>
            <a target="_blank" className="uk-card-title">
              {movie.title}
            </a>
          </Link>
          <p>{displayYear(movie.release_date)}</p>
          <p>Ratings: {movie.vote_average}</p>
          <StarIcon
            movieId={movie.id}
            isSelected={isMovieSelected}
            handleClick={selectMovie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
