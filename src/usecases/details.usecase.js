import { DetailsRepository } from '../repositories/details.repository';

export class DetailsUseCase {
  async execute ({ id, type }) {
    const repository = new DetailsRepository();
    const [details, { results: videos }] = await Promise.all([
      repository.getElementDetails({ id, type }),
      repository.getElementVideos({ id, type })
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
