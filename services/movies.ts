import { AxiosResponse } from "axios";
import httpClient from "../helpers/httpClient";
import { Movie, MovieResponse } from "../types/movies.type";

class MovieDataService {
  static async getTopMovies(total: number): Promise<Movie[]> {
    let results: Movie[] = [];

    /**
     * I wish there was a better way to query for specific pages
     * instead of having to loop
     */
    const emptyArrays = new Array(total).fill(0);
    const requests: Promise<Movie[]>[] = emptyArrays.map(
      (val, idx) =>
        new Promise(async (resolve, reject) => {
          try {
            const { data }: AxiosResponse<MovieResponse> = await httpClient.get(
              "https://api.themoviedb.org/3/movie/top_rated",
              {
                params: {
                  page: idx + 1,
                },
              }
            );
            resolve(data.results);
          } catch (error) {
            reject(error);
          }
        })
    );
    try {
      const allPageResponse = await Promise.all(requests);
      results = allPageResponse.reduce((acc, pageResponse) => {
        acc = [...acc, ...pageResponse];
        return acc;
      }, []);
    } catch (error) {
      console.log(error);
    }
    return results;
  }
}

export default MovieDataService;
