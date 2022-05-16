import { TMDBRepository } from '../repositories/tmdb.repository';

export class TopRatedUseCase {
  async execute ({ type }) {
    const repository = new TMDBRepository();

    const [{ results }, { genres }] = await Promise.all([
      repository.getTopRated({ type }),
      repository.getGenres({ type })
    ]);
    let sortedResults = [...results]
      .map(result => {
        return { media_type: type, ...result };
      })
      .sort((a, b) => b.vote_average - a.vote_average);
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
