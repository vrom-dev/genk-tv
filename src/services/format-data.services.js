export class FormatDataService {
  static addReleaseDateAndTitle (element = {}) {
    /* eslint-disable camelcase */
    const { first_air_date: release_date, name: title } = element;
    return {
      release_date,
      title,
      ...element
    };
  }

  static filterVideos (videosArray) {
    return [...videosArray].find(video => video.type === 'Trailer');
  }

  static sortByPopularity (elementsArray) {
    return [...elementsArray].sort((a, b) => b.popularity - a.popularity);
  }

  static sortByRating (elementsArray) {
    return [...elementsArray].sort((a, b) => b.vote_average - a.vote_average);
  }

  static addMediaTypeProp (elementsArray, type) {
    return [...elementsArray].map(result => {
      return { media_type: type, ...result };
    });
  }

  static getGenresObject (genresArray) {
    return [...genresArray].reduce((prev, current) => {
      prev[current.id] = current.name;
      return prev;
    }, {});
  }

  static filterByPoster (elementsArray) {
    return [...elementsArray].filter(result => result.poster_path !== null);
  }

  static filterMoviesAndTv (elementsArray) {
    return [...elementsArray].filter(result => result.media_type === 'movie' || result.media_type === 'tv');
  }
}
