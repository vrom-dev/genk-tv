
import { TMDBRepository } from '../repositories/tmdb.repository';

export class RecommendationUseCase {
  async execute ({ id, type }) {
    const repository = new TMDBRepository();
    const [{ results }, { genres }] = await Promise.all([
      repository.getRecommendations({ id, type }),
      repository.getGenres({ type })
    ]);
    let recommendations = [...results]
      .map(result => {
        return { media_type: type, ...result };
      });
    if (type === 'tv') {
      recommendations = [...recommendations]
        .map((tvshow) => {
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
      results: recommendations,
      genres: genresObj
    };
  }
}
