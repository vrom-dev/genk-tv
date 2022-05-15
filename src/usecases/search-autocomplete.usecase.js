import { TMDBRepository } from '../repositories/tmdb.repository';

export class SearchAutocompleteUseCase {
  async execute ({ query = '' }) {
    const repository = new TMDBRepository();
    const { results } = await repository.getSearchResults({ query });
    const filteredResults = [...results]
      .filter(result => {
        return result.media_type === 'movie' || result.media_type === 'tv';
      })
      .filter(result => result.poster_path !== null)
      .map(result => {
        if (result.media_type === 'tv') {
        /* eslint-disable camelcase */
          const { first_air_date: release_date, name: title } = result;
          return {
            release_date,
            title,
            ...result
          };
        }
        return result;
      });
    const totalResults = filteredResults.length;
    const resultsToPreview = filteredResults.slice(0, 8);
    return { results: resultsToPreview, totalResults };
  }
}
