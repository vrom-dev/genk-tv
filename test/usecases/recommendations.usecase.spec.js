import { TMDBRepository } from '../../src/repositories/tmdb.repository';
import MOVIE_RECOMMENDATIONS from '../../fixtures/movies_recommendations.json';
import MOVIES_GENRES from '../../fixtures/movies_genres.json';
import TV_RECOMMENDATIONS from '../../fixtures/tvshow_recommendations.json';
import TV_GENRES from '../../fixtures/tv_genres.json';
import { RecommendationUseCase } from '../../src/usecases/recommendations.usecase';

jest.mock('../../src/repositories/tmdb.repository');

describe('Recommendations use case...', () => {
  beforeEach(() => {
    TMDBRepository.mockClear();
  });

  it('should execute correctly, returning a new object with all data', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getRecommendations: () => MOVIE_RECOMMENDATIONS,
        getGenres: () => MOVIES_GENRES
      };
    });

    const useCase = new RecommendationUseCase();
    const response = await useCase.execute({ type: 'movie' });
    expect(Object.keys(response)).toEqual(['results', 'genres']);

    const { results, genres } = response;
    expect(Object.keys(genres)).toEqual(['12', '14', '16', '18', '27', '28', '35', '36', '37', '53', '80', '99', '878', '9648', '10402', '10749', '10751', '10752', '10770']);
    expect(genres[12]).toBe('Aventura');
    expect(genres[10749]).toBe('Romance');
    expect(results).toHaveLength(21);

    const singleMovie = results[0];
    expect(Object.keys(singleMovie)).toEqual(['media_type', 'adult', 'backdrop_path', 'genre_ids', 'id', 'title', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'release_date', 'video', 'vote_average', 'vote_count']);
    expect(singleMovie.title).toBe('El Proyecto Adam');
    expect(singleMovie.media_type).toBe('movie');
    expect(singleMovie.release_date).toBe('2022-03-11');
    expect(singleMovie.vote_average).toBe(7.054);
    expect(singleMovie.genre_ids).toEqual([28, 12, 35, 878]);
  });
  it('with tvs it adds release and title properties to the object', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getRecommendations: () => TV_RECOMMENDATIONS,
        getGenres: () => TV_GENRES
      };
    });

    const useCase = new RecommendationUseCase();
    const response = await useCase.execute({ type: 'tv' });

    const { results } = response;
    const singleMovie = results[0];

    expect(singleMovie.title).toBe('Vikingos');
    expect(singleMovie.media_type).toBe('tv');
    expect(singleMovie.release_date).toBe('2013-03-03');
  });
});
