import { DetailsRepository } from '../../src/repositories/details.repository';
import { DetailsUseCase } from '../../src/usecases/details.usecase';

import MOVIE_DETAIL from '../../fixtures/movie_detail.json';
import MOVIE_VIDEOS from '../../fixtures/movie_videos.json';
import TV_DETAIL from '../../fixtures/tvshow_detail.json';
import TV_VIDEOS from '../../fixtures/tvshow_videos.json';

jest.mock('../../src/repositories/details.repository');

describe('Popular movies use case...', () => {
  beforeEach(() => {
    DetailsRepository.mockClear();
  });

  it('with movies, it returns an object with all data with the trailer added', async () => {
    DetailsRepository.mockImplementation(() => {
      return {
        getElementDetails: () => MOVIE_DETAIL,
        getElementVideos: () => MOVIE_VIDEOS
      };
    });
    const useCase = new DetailsUseCase();
    const movie = await useCase.execute({ id: 508947, type: 'movie' });
    expect(Object.keys(movie)).toEqual(['trailer', 'adult', 'backdrop_path', 'belongs_to_collection', 'budget', 'genres', 'homepage', 'id', 'imdb_id', 'original_language', 'original_title', 'overview', 'popularity', 'poster_path', 'production_companies', 'production_countries',
      'release_date', 'revenue', 'runtime', 'spoken_languages', 'status', 'tagline', 'title', 'video', 'vote_average', 'vote_count']);
    expect(movie.title).toBe('Red');
    expect(movie.release_date).toBe('2022-03-10');
    expect(movie.backdrop_path).toBe('/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg');
    expect(movie.poster_path).toBe('/hUupIkIKPpNLYniPGRxRpEQFrX3.jpg');
    expect(movie.vote_average).toBe(7.4);
    expect(movie.trailer.type).toBe('Trailer');
  });
  it('with tv shows, it returns an object it adds title and release_date properties', async () => {
    DetailsRepository.mockImplementation(() => {
      return {
        getElementDetails: () => TV_DETAIL,
        getElementVideos: () => TV_VIDEOS
      };
    });
    const useCase = new DetailsUseCase();
    const movie = await useCase.execute({ id: 63333, type: 'tv' });
    expect(Object.keys(movie)).toEqual(['release_date', 'title', 'trailer', 'adult', 'backdrop_path', 'created_by', 'episode_run_time', 'first_air_date', 'genres', 'homepage', 'id', 'in_production', 'languages', 'last_air_date', 'last_episode_to_air', 'name', 'next_episode_to_air', 'networks', 'number_of_episodes', 'number_of_seasons', 'origin_country', 'original_language', 'original_name', 'overview', 'popularity', 'poster_path', 'production_companies', 'production_countries', 'seasons', 'spoken_languages', 'status', 'tagline', 'type', 'vote_average', 'vote_count']);
    expect(movie.title).toBe('The Last Kingdom');
    expect(movie.release_date).toBe('2015-10-10');
    expect(movie.backdrop_path).toBe('/QbtctI8EzlhsyFDMUMyG3fli8B.jpg');
    expect(movie.poster_path).toBe('/wUFIEJCSmurmXPX0mP0cEgoltrk.jpg');
    expect(movie.vote_average).toBe(8.2);
    expect(movie.trailer.type).toBe('Trailer');
  });
});
