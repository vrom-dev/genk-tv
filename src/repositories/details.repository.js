import axios from 'axios';
import config from '../../api.config.json';

export class DetailsRepository {
  async getElementDetails ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}?api_key=${process.env.API_KEY}&language=es-ES`);
    return data;
  }

  async getElementVideos ({ id, type }) {
    const { API_URL } = config;
    const { data } = await axios.get(`${API_URL}/${type}/${id}/videos?api_key=${process.env.API_KEY}`);
    return data;
  }
}
