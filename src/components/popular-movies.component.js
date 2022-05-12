import { html, LitElement } from 'lit';
import { PopularMoviesUsecase } from '../usecases/popular-movies.usecase';
import '../ui/cards-list.ui';

export class PopularMoviesComponent extends LitElement {
  static get properties () {
    return {
      movies: {
        type: Object,
        state: true
      },
      genres: {
        type: Object,
        state: true
      }
    };
  }

  async connectedCallback () {
    super.connectedCallback();
    const popularMoviesUsecase = new PopularMoviesUsecase();
    const response = await popularMoviesUsecase.execute();
    const { results, genres } = response;
    this.movies = results;
    this.genres = genres;
  }

  render () {
    return html`<tmdb-cards-list-ui .list=${this.movies} .genres=${this.genres} ></tmdb-cards-list-ui>`;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-popular-movies', PopularMoviesComponent);
