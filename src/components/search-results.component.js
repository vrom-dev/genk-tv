import { html, LitElement } from 'lit';

import { SearchUseCase } from '../usecases/search.usecase';
import '../ui/cards-list.ui';

export class SearchResultsComponent extends LitElement {
  constructor () {
    super();
    this.searchParamsHandler = this._handleSearchParamsChange.bind(this);
  }

  static get properties () {
    return {
      results: {
        type: Object,
        state: true
      },
      query: {
        type: String,
        state: true
      }
    };
  }

  _handleSearchParamsChange () {
    const params = new URL(document.location);
    if (params.pathname === '/search') {
      this._fetchData();
    }
  }

  async _fetchData () {
    const useCase = new SearchUseCase();
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    this.query = query;
    const { results, genres } = await useCase.execute({ query });
    this.results = results;
    this.genres = genres;
  }

  async connectedCallback () {
    super.connectedCallback();
    this._fetchData();
    window.addEventListener('vaadin-router-location-changed', this.searchParamsHandler);
  }

  disconnectedCallback () {
    window.removeEventListener('vaadin-router-location-changed', this.searchParamsHandler);
    super.disconnectedCallback();
  }

  render () {
    return html`
        <h1 class='page-title'>Resultados de búsqueda para: '${this.query}'</h1>
        ${this.results && this.results.length > 0
          ? html`<tmdb-cards-list-ui .list=${this.results} .genres=${this.genres} ></tmdb-cards-list-ui>`
          : html`<p>Lo sentimos, no existen resultados para esta búsqueda.</p>`
        }
      `;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-search-results', SearchResultsComponent);
