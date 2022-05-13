import axios from 'axios';
import config from '../../api.config.json';

export class TMDBRepository {
  async getMostPopular ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/popular?api_key=${process.env.API_KEY}&language=es-ES&page=1&region=ES&include_adult=false`);
    return data;
  }

  async getGenres ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/genre/${type}/list?api_key=${process.env.API_KEY}&language=es-ES`);
    return data;
  }

  async getDetails ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}?api_key=${process.env.API_KEY}&language=es-ES`);
    return data;
  }

  async getVideos ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}/videos?api_key=${process.env.API_KEY}`);
    return data;
  }
}