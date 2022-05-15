import { TMDBRepository } from '../../src/repositories/tmdb.repository';
import MULTI_SEARCH from '../../fixtures/multi_search.json';
import MOVIES_GENRES from '../../fixtures/movies_genres.json';
import TV_GENRES from '../../fixtures/tv_genres.json';
import { SearchUseCase } from '../../src/usecases/search.usecase';

jest.mock('../../src/repositories/tmdb.repository');

describe('Most popular use case...', () => {
  beforeEach(() => {
    TMDBRepository.mockClear();
  });

  it('should execute correctly, returning a new object with the results array and the total of results', async () => {
    const ALL_GENRES = { ...MOVIES_GENRES, genres: MOVIES_GENRES.genres.concat(TV_GENRES.genres) };
    TMDBRepository.mockImplementation(() => {
      return {
        getSearchResults: () => MULTI_SEARCH,
        getGenres: () => ALL_GENRES
      };
    });

    const useCase = new SearchUseCase();
    const response = await useCase.execute({ query: 'the last kingdom' });
    expect(Object.keys(response)).toEqual(['results', 'genres']);

    const { results, genres } = response;
    expect(results).toHaveLength(3);
    expect(Object.keys(genres)).toEqual(['12', '14', '16', '18', '27', '28', '35', '36', '37', '53', '80', '99', '878', '9648', '10402', '10749', '10751', '10752', '10759', '10762', '10763', '10764', '10765', '10766', '10767', '10768', '10770']);
    expect(genres[12]).toBe('Aventura');
    expect(genres[10764]).toBe('Reality');
    expect(genres[10770]).toBe('Película de TV');
    const singleResult = results[0];
    expect(singleResult.title).toBe('The Last Kingdom');
    expect(singleResult.media_type).toBe('tv');
    expect(singleResult.release_date).toBe('2015-10-10');
    expect(singleResult.vote_average).toBe(8.2);
    expect(singleResult.overview).toBe('La serie está ambientada en el siglo IX donde lo que hoy se conoce como Inglaterra eran varios reinos independientes. Las tierras anglosajonas son atacadas y en muchos casos gobernadas por fuerzas vikingas. El reino de Wessex se ha dejado solo bajo el mando del Rey Alfred el Grande. Uhtred, hijo huérfano de un noble sajón, es secuestrado por los normandos y criado como uno de ellos. Así, es obligado a elegir entre un reino que comparte sus ancestros y la gente a la que es leal.');
  });
});
