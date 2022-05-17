import { TMDBRepository } from '../repositories/tmdb.repository';

export class UpcomingUseCase {
  async execute () {
    const repository = new TMDBRepository();
    const { results } = await repository.getUpcoming();
    /* eslint-disable camelcase */
    const resultsWithAllData = results.map(({ release_date, title }) => {
      return { release_date, title };
    });

    return {
      results: resultsWithAllData
    };
  }
}
