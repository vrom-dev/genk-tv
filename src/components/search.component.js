import { css, html, LitElement } from 'lit';
import { Router } from '@vaadin/router';

class TMDBSearchBar extends LitElement {
  static get styles () {
    return css`
      input {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: block;
        width: 100%;
        height: 2rem;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        line-height: 1rem;
        padding: 0 1rem;
        color: var(--text-color-secondary)
      }
    `;
  }

  handleSubmit (e) {
    e.preventDefault();
    const inputSearch = e.target['search-form'];
    const { value: query } = inputSearch;
    inputSearch.blur();
    e.target.reset();
    Router.go({
      pathname: '/search',
      search: `?q=${query}`
    });
  }

  render () {
    return html`
      <form @submit=${this.handleSubmit}>
        <input type='text' placeholder='Buscar...' name='search-form'/>
      </form>
    `;
  }
}

customElements.define('tmdb-search-bar', TMDBSearchBar);
