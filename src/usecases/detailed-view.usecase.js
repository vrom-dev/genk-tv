import { TMDBRepository } from '../repositories/tmdb.repository';

export class DetailedViewUseCase {
  async execute ({ id, type }) {
    const repository = new TMDBRepository();
    const [details, { results: videos }] = await Promise.all([
      repository.getDetails({ id, type }),
      repository.getVideos({ id, type })
    ]);
    const trailer = videos.find(video => video.type === 'Trailer');
    if (type === 'tv') {
      /* eslint-disable camelcase */
      const { first_air_date: release_date, name: title } = details;
      return {
        release_date,
        title,
        trailer,
        ...details
      };
    }
    return {
      trailer,
      ...details
    };
  }
}
