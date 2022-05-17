import { TMDBRepository } from '../repositories/tmdb.repository';
import { FormatDataService } from '../services/format-data.services';

export class MostPopularUseCase {
  async execute ({ type }) {
    const repository = new TMDBRepository();

    const [{ results }, { genres }] = await Promise.all([
      repository.getMostPopular({ type }),
      repository.getGenres({ type })
    ]);
    const sortedResults = FormatDataService.sortByPopularity(results);
    let resultsWithAllData = FormatDataService.addMediaTypeProp(sortedResults, type);
    if (type === 'tv') {
      resultsWithAllData = [...resultsWithAllData].map(FormatDataService.addReleaseDateAndTitle);
    }
    const genresObject = FormatDataService.getGenresObject(genres);

    return {
      results: resultsWithAllData,
      genres: genresObject
    };
  }
}
