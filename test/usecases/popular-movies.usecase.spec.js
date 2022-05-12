import { MoviesRepository } from '../../src/repositories/movies.repository';
import POPULAR_MOVIES from '../../fixtures/popular_movies.json';
import MOVIES_GENRES from '../../fixtures/movies_genres.json';
import { PopularMoviesUsecase } from '../../src/usecases/popular-movies.usecase';

jest.mock('../../src/repositories/movies.repository');

describe('Popular movies use case...', () => {
  beforeEach(() => {
    MoviesRepository.mockClear();
  });

  it('should execute correctly, returning a new object with all data', async () => {
    MoviesRepository.mockImplementation(() => {
      return {
        getMostPopularMovies: () => POPULAR_MOVIES,
        getMoviesGenre: () => MOVIES_GENRES
      };
    });

    const useCase = new PopularMoviesUsecase();
    const response = await useCase.execute();
    expect(Object.keys(response)).toEqual(['results', 'genres']);

    const { results, genres } = response;
    expect(Object.keys(results)).toEqual(['elements', 'elementType']);
    expect(Object.keys(genres)).toEqual(['12', '14', '16', '18', '27', '28', '35', '36', '37', '53', '80', '99', '878', '9648', '10402', '10749', '10751', '10752', '10770']);
    expect(genres[12]).toBe('Aventura');
    expect(genres[10749]).toBe('Romance');
    expect(results.elementType).toBe('movies');
    expect(results.elements).toHaveLength(20);

    const singleMovie = results.elements[0];
    expect(Object.keys(singleMovie)).toEqual(['adult', 'backdrop_path', 'genre_ids', 'id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'release_date', 'title', 'video', 'vote_average', 'vote_count']);
    expect(singleMovie.title).toBe('Sonic 2: La Película');
    expect(singleMovie.release_date).toBe('2022-03-30');
    expect(singleMovie.vote_average).toBe(7.7);
    expect(singleMovie.genre_ids).toEqual([28, 878, 35, 10751, 12]);
  });
});
