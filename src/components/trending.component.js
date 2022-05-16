import { html, LitElement } from 'lit';

import { TrendingUseCase } from '../usecases/trending.usecase';
import '../ui/cards-list.ui';

export class TrendingComponent extends LitElement {
  static get properties () {
    return {
      type: {
        type: String,
        attribute: true
      },
      results: {
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
    const useCase = new TrendingUseCase();
    const response = await useCase.execute({ type: this.type });
    const { results, genres } = response;
    this.results = results;
    this.genres = genres;
  }

  render () {
    return html`<tmdb-cards-list-ui .list=${this.results} .genres=${this.genres} landscape></tmdb-cards-list-ui>`;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-trending', TrendingComponent);
