import { MoviesRepository } from '../repositories/movies.repository';

export class PopularMoviesUsecase {
  async execute () {
    const repository = new MoviesRepository();

    const [{ results: movies }, { genres }] = await Promise.all([
      repository.getMostPopularMovies(),
      repository.getMoviesGenre()
    ]);
    const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
    const genresObj = genres.reduce((prev, current) => {
      prev[current.id] = current.name;
      return prev;
    }, {});
    return {
      results: {
        elements: sortedMovies,
        elementType: 'movie'
      },
      genres: genresObj
    };
  }
}
