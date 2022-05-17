import { TMDBRepository } from '../repositories/tmdb.repository';
import { FormatDataService } from '../services/format-data.services';

export class SearchAutocompleteUseCase {
  async execute ({ query = '' }) {
    const repository = new TMDBRepository();
    const { results } = await repository.getSearchResults({ query });
    const moviesAndTvShows = FormatDataService.filterMoviesAndTv(results);
    const moviesAndTvShowsWithPoster = FormatDataService.filterByPoster(moviesAndTvShows);
    const resultsWithAllData = [...moviesAndTvShowsWithPoster].map(result => {
      if (result.media_type === 'tv') {
        return FormatDataService.addReleaseDateAndTitle(result);
      }
      return result;
    });
    const totalResults = resultsWithAllData.length;
    const resultsToPreview = resultsWithAllData.slice(0, 8);
    return { results: resultsToPreview, totalResults };
  }
}
