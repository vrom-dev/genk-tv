import { TMDBRepository } from '../../src/repositories/tmdb.repository';
import TRENDING_MOVIES from '../../fixtures/movies_trending.json';
import MOVIES_GENRES from '../../fixtures/movies_genres.json';
import TRENDING_TV from '../../fixtures/tvshow_trending.json';
import TV_GENRES from '../../fixtures/tv_genres.json';
import { TrendingUseCase } from '../../src/usecases/trending.usecase';

jest.mock('../../src/repositories/tmdb.repository');

describe('Trending use case...', () => {
  beforeEach(() => {
    TMDBRepository.mockClear();
  });

  it('should execute correctly, returning a new object with all data', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getTrendingToday: () => TRENDING_MOVIES,
        getGenres: () => MOVIES_GENRES
      };
    });

    const useCase = new TrendingUseCase();
    const response = await useCase.execute({ type: 'movie' });
    expect(Object.keys(response)).toEqual(['results', 'genres']);

    const { results, genres } = response;
    expect(Object.keys(genres)).toEqual(['12', '14', '16', '18', '27', '28', '35', '36', '37', '53', '80', '99', '878', '9648', '10402', '10749', '10751', '10752', '10770']);
    expect(genres[12]).toBe('Aventura');
    expect(genres[10749]).toBe('Romance');
    expect(results).toHaveLength(20);

    const singleMovie = results[0];
    expect(Object.keys(singleMovie)).toEqual(['media_type', 'adult', 'backdrop_path', 'genre_ids', 'id', 'original_language', 'original_title', 'overview', 'poster_path', 'release_date', 'title', 'video', 'vote_average', 'vote_count', 'popularity']);
    expect(singleMovie.title).toBe('Morbius');
    expect(singleMovie.media_type).toBe('movie');
    expect(singleMovie.release_date).toBe('2022-03-30');
    expect(singleMovie.vote_average).toBe(6);
    expect(singleMovie.genre_ids).toEqual([28, 878, 14]);
  });
  it('with tvs it adds release and title properties to the object', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getTrendingToday: () => TRENDING_TV,
        getGenres: () => TV_GENRES
      };
    });

    const useCase = new TrendingUseCase();
    const response = await useCase.execute({ type: 'tv' });

    const { results } = response;
    const singleMovie = results[0];

    expect(singleMovie.title).toBe('La mujer del viajero en el tiempo');
    expect(singleMovie.media_type).toBe('tv');
    expect(singleMovie.release_date).toBe('2022-05-15');
  });
});
