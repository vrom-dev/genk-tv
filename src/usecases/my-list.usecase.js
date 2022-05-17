import { snapshot } from 'valtio/vanilla';
import { myListState } from '../states/my-list.state';

import { FormatDataService } from '../services/format-data.services';

export class MyListUseCase {
  async execute () {
    const { tv, movie } = snapshot(myListState);
    const movieGenres = movie.map(movie => movie.genres).flat();
    const tvGenres = tv.map(tvshow => tvshow.genres).flat();
    const formattedMovies = movie.map(movie => {
      const genresArray = movie.genres.map(genre => genre.id);
      return { ...movie, genre_ids: genresArray, media_type: 'movie' };
    });
    const formattedTv = tv.map(tv => {
      const genresArray = tv.genres.map(genre => genre.id);
      return { ...tv, genre_ids: genresArray, media_type: 'tv' };
    });
    const genresObject = FormatDataService.getGenresObject(movieGenres.concat(tvGenres));

    return {
      movies: formattedMovies,
      tv: formattedTv,
      genres: genresObject
    };
  }
}
