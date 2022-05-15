import { TMDBRepository } from '../repositories/tmdb.repository';

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
    const allGenres = genresMovies
      .concat(genresTV)
      .reduce((prev, current) => {
        prev[current.id] = current.name;
        return prev;
      }, {});
    return { results: filteredResults, genres: allGenres };
  }
}
