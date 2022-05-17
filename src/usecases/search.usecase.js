import { TMDBRepository } from '../repositories/tmdb.repository';
import { FormatDataService } from '../services/format-data.services';

export class SearchUseCase {
  async execute ({ query = '' }) {
    const repository = new TMDBRepository();
    const [
      { results },
      { genres: genresMovies },
      { genres: genresTV }
    ] = await Promise.all([
      repository.getSearchResults({ query }),
      repository.getGenres({ type: 'movie' }),
      repository.getGenres({ type: 'tv' })
    ]);
    const moviesAndTvShows = FormatDataService.filterMoviesAndTv(results);
    const moviesAndTvShowsWithPoster = FormatDataService.filterByPoster(moviesAndTvShows);
    const resultsWithAllData = [...moviesAndTvShowsWithPoster].map(result => {
      if (result.media_type === 'tv') {
        return FormatDataService.addReleaseDateAndTitle(result);
      }
      return result;
    });
    const genresObject = FormatDataService.getGenresObject(genresMovies.concat(genresTV));

    return { results: resultsWithAllData, genres: genresObject };
  }
}
