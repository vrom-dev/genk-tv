import { TMDBRepository } from '../repositories/tmdb.repository';

export class TrendingUseCase {
  async execute ({ type }) {
    const repository = new TMDBRepository();

    const [{ results }, { genres }] = await Promise.all([
      repository.getTrendingToday({ type }),
      repository.getGenres({ type })
    ]);
    let sortedResults = [...results]
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
