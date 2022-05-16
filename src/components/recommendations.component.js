import { html, LitElement } from 'lit';

import { RecommendationUseCase } from '../usecases/recommendations.usecase';
import '../ui/cards-list.ui';

export class RecommendationComponent extends LitElement {
  static get properties () {
    return {
      type: {
        type: String,
        attribute: true
      },
      id: {
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

    const useCase = new RecommendationUseCase();
    const response = await useCase.execute({ type: this.type, id: this.id });
    const { results, genres } = response;
    this.results = results;
    this.genres = genres;
  }

  render () {
    return this.results?.length > 0
      ? html`
      <aside>
          <h1 class='recommended-title'>También te podría gustar:</h1>
          <tmdb-cards-list-ui .list=${this.results} .genres=${this.genres} landscape></tmdb-cards-list-ui>
      </aside>`
      : null;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-recommendations', RecommendationComponent);
