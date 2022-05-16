import { html, LitElement } from 'lit';

import { MyListUseCase } from '../usecases/my-list.usecase';
import '../ui/cards-list.ui';

export class MyListComponent extends LitElement {
  static get properties () {
    return {
      movies: {
        type: Object,
        state: true
      },
      tv: {
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
    const useCase = new MyListUseCase();
    const { tv, movies, genres } = await useCase.execute();
    this.tv = tv;
    this.movies = movies;
    this.genres = genres;
  }

  render () {
    return html`
        <section>
          <h1>Películas</h1>
          ${
            this.movies.length
            ? html`<tmdb-cards-list-ui .list=${this.movies} .genres=${this.genres} landscape></tmdb-cards-list-ui>`
            : html`<p>No hay ninguna película guardada todavía.</p>`
          }
        </section>
        <section>
          <h1>Programas de TV y series</h1>
          ${
            this.tv.length
            ? html`<tmdb-cards-list-ui .list=${this.tv} .genres=${this.genres} landscape></tmdb-cards-list-ui>`
            : html`<p>No hay ningun programa de TV o serie guardada todavía.</p>`
          }
        </section>
      `;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-my-list', MyListComponent);
