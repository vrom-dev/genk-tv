import { TMDBRepository } from '../repositories/tmdb.repository';
import { FormatDataService } from '../services/format-data.services';

export class TrendingUseCase {
  async execute ({ type }) {
    const repository = new TMDBRepository();
    const [{ results }, { genres }] = await Promise.all([
      repository.getTrendingToday({ type }),
      repository.getGenres({ type })
    ]);
    let resultsWithAllData = FormatDataService.addMediaTypeProp(results, type);
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
