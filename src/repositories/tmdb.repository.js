import axios from 'axios';
import config from '../../api.config.json';

export class TMDBRepository {
  async getMostPopular ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/popular?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&page=1&region=ES&include_adult=false`);
    return data;
  }

  async getGenres ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/genre/${type}/list?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES`);
    return data;
  }

  async getDetails ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES`);
    return data;
  }

  async getVideos ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}/videos?api_key=64a40f1d1740c362639f6b91739db0ca`);
    return data;
  }

  async getSearchResults ({ query }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/search/multi?api_key=64a40f1d1740c362639f6b91739db0ca&query=${query}&language=es-ES&region=ES&include_adult=false`);
    return data;
  }

  async getTrendingToday ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/trending/${type}/day?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false`);
    return data;
  }

  async getTopRated ({ type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/top_rated?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false`);
    return data;
  }

  async getRecommendations ({ type, id }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}/recommendations?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false`);
    return data;
  }

  async getUpcoming () {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/movie/upcoming?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&region=ES&include_adult=false`);
    return data;
  }
}
