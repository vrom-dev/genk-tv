import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';

import { SearchAutocompleteUseCase } from '../usecases/search-autocomplete.usecase';
import '../ui/search-item.ui';

class TMDBSearchBar extends LitElement {
  constructor () {
    super();
    this.resetFormHandler = this.resetForm.bind(this);
  }

  static get properties () {
    return {
      results: {
        type: Array,
        state: true
      },
      totalResults: {
        type: Number,
        state: true
      },
      query: {
        type: String,
        state: true
      }
    };
  }

  static get styles () {
    return css`
      .search-bar {
        position: relative;
      }
      input {
        font-family: inherit;
        display: block;
        width: 100%;
        height: 2rem;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        line-height: 1rem;
        padding: 0 1rem;
        color: var(--text-color-secondary);
      }
      .results__list {
        padding-left:0;
        list-style: none;
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
        top: 1rem;
        left: 1rem;
        background-color: var(--bg-color);
        width: 300px;
        position: absolute;
        overflow: hidden;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      .results__list-item {
        padding: 0.5rem;
        font-size: .9rem;
        text-align: center;
        background-color: hsla(199, 89%, 48%, .1);
        color: var(--text-color-secondary);
      }
      .results__list-item:hover {
        background-color: hsla(199, 89%, 48%, .2);
        padding: 0.5rem;
      }
    `;
  }

  handleChange (e) {
    clearTimeout(this.timer);
    this.query = e.target.value;
    if (this.query.length === 0) {
      this.results = null;
      return;
    }
    this.timer = setTimeout(async () => {
      const useCase = new SearchAutocompleteUseCase();
      const { results, totalResults } = await useCase.execute({ query: this.query });
      this.results = results;
      this.totalResults = totalResults;
    }, 300);
  }

  handleSubmit (e) {
    e.preventDefault();
    const inputSearch = e.target['search-form'];
    const { value: query } = inputSearch;
    this.resetForm();
    Router.go({
      pathname: '/search',
      search: `?q=${query}`
    });
  }

  resetForm () {
    const form = this.shadowRoot.querySelector('form');
    const inputSearch = form['search-form'];
    this.results = null;
    inputSearch.blur();
    form.reset();
  }

  async connectedCallback () {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', this.resetFormHandler);
  }

  disconnectedCallback () {
    window.removeEventListener('vaadin-router-location-changed', this.resetFormHandler);
    super.disconnectedCallback();
  }

  render () {
    const resultsList = this.results?.length
      ? this.results.map(result => html`<tmdb-search-item-ui .element=${result}></tmdb-search-item-ui>`)
      : null;
    return html`
      <div class='search-bar'>
        <form @submit=${this.handleSubmit}>
          <input type='text' placeholder='Buscar...' name='search-form' @input=${this.handleChange} />
        </form>
        <ul class='results__list'>
          ${
            this.results?.length > 0
            ? html`<li class='results__list-item'>
                  <a href='/search?q=${this.query}'>Ver todos los resultados (total: ${this.totalResults})</a>
                </li>`
            : null
          }
          ${resultsList}
        </ul>
      </div>
    `;
  }
}

customElements.define('tmdb-search-bar', TMDBSearchBar);
