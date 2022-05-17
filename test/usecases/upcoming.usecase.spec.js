import { TMDBRepository } from '../../src/repositories/tmdb.repository';
import UPCOMING from '../../fixtures/upcoming.json';

import { UpcomingUseCase } from '../../src/usecases/upcoming.usecase';

jest.mock('../../src/repositories/tmdb.repository');

describe('Upcoming use case...', () => {
  beforeEach(() => {
    TMDBRepository.mockClear();
  });

  it('should execute correctly, returning a new object with the results array and the total of results', async () => {
    TMDBRepository.mockImplementation(() => {
      return {
        getUpcoming: () => UPCOMING
      };
    });

    const useCase = new UpcomingUseCase();
    const response = await useCase.execute();
    expect(Object.keys(response)).toEqual(['results']);

    const { results } = response;
    expect(results).toHaveLength(20);
    const singleResult = results[0];
    expect(Object.keys(singleResult)).toEqual(['release_date', 'title']);
    expect(singleResult.title).toBe('El sastre de la mafia');
    expect(singleResult.release_date).toBe('2022-05-20');
  });
});
