import { TMDBRepository } from '../repositories/tmdb.repository';

export class MostPopularUseCase {
  async execute ({ type }) {
    const repository = new TMDBRepository();

    const [{ results }, { genres }] = await Promise.all([
      repository.getMostPopular({ type }),
      repository.getGenres({ type })
    ]);
    let sortedResults = [...results]
      .sort((a, b) => b.popularity - a.popularity)
      .map(result => {
        return { media_type: type, ...result };
      });
    if (type === 'tv') {
      sortedResults = [...sortedResults].map((tvshow) => {
        /* eslint-disable camelcase */
        const { first_air_date: release_date, name: title } = tvshow;
        return {
          release_date,
          title,
          ...tvshow
        };
      });
    }
    const genresObj = genres.reduce((prev, current) => {
      prev[current.id] = current.name;
      return prev;
    }, {});
    return {
      results: sortedResults,
      genres: genresObj
    };
  }
}
