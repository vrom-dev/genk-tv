import axios from 'axios';
import config from '../../api.config.json';

export class MoviesRepository {
  async getMostPopularMovies () {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/movie/popular?api_key=${process.env.API_KEY}&language=es-ES&page=1&include_adult=false`);
    return data;
  }

  async getMoviesGenre () {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=es-ES`);
    return data;
  }
}
