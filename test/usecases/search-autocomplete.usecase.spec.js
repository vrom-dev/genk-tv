import { TMDBRepository } from '../../src/repositories/tmdb.repository';
import MULTI_SEARCH from '../../fixtures/multi_search.json';
import { SearchAutocompleteUseCase } from '../../src/usecases/search-autocomplete.usecase';

jest.mock('../../src/repositories/tmdb.repository');

describe('Most popular use case...', () => {
  beforeEach(() => {
    TMDBRepository.mockClear();
  });

  it('should execute correctly, returning a new object with the results array and the total of results', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getSearchResults: () => MULTI_SEARCH
      };
    });

    const useCase = new SearchAutocompleteUseCase();
    const response = await useCase.execute({ query: 'the last kingdom' });
    expect(Object.keys(response)).toEqual(['results', 'totalResults']);

    const { results, totalResults } = response;
    expect(totalResults).toBe(3);
    expect(results).toHaveLength(3);
    const singleResult = results[0];
    expect(singleResult.title).toBe('The Last Kingdom');
    expect(singleResult.media_type).toBe('tv');
    expect(singleResult.poster_path).not.toBe(null);
    expect(singleResult.release_date).toBe('2015-10-10');
    expect(singleResult.vote_average).toBe(8.2);
    expect(singleResult.overview).toBe('La serie está ambientada en el siglo IX donde lo que hoy se conoce como Inglaterra eran varios reinos independientes. Las tierras anglosajonas son atacadas y en muchos casos gobernadas por fuerzas vikingas. El reino de Wessex se ha dejado solo bajo el mando del Rey Alfred el Grande. Uhtred, hijo huérfano de un noble sajón, es secuestrado por los normandos y criado como uno de ellos. Así, es obligado a elegir entre un reino que comparte sus ancestros y la gente a la que es leal.');
  });
});
