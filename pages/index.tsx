import { NextPage } from "next";

// components
import MovieList from "components/movies/MovieList";

// services
import MovieDataService from "../services/movies";

// types
import { Movie } from "../types/movies.type";
interface Props {
  moviesList: Movie[];
}

const Home: NextPage<Props> = ({ moviesList }: Props) => {
  return (
    <>
      <header>
        <div className="uk-section uk-section-secondary">
          <div className="uk-container uk-text-center">
            <h3>Welcome to Movie List</h3>
          </div>
        </div>
      </header>
      <MovieList movieData={moviesList} />
    </>
  );
};

Home.getInitialProps = async () => {
  /**
   * According to TMDB API, each page returns 20 results
   * to get the top 500, we need to query for the first 25 pages
   */
  const moviesList: Movie[] = await MovieDataService.getTopMovies(25);
  return {
    moviesList,
  };
};

export default Home;
