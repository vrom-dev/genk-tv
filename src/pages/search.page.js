import { css, html, LitElement } from 'lit';

export class SearchPage extends LitElement {
  constructor () {
    super();
    this.searchParamsHandler = this._handleSearchParamsChange.bind(this);
  }

  static get properties () {
    return {
      query: {
        type: String,
        state: true
      },
      searchParamsHandler: {
        attribute: false
      }
    };
  }

  _updateQuery () {
    const params = (new URL(document.location)).searchParams;
    const query = params.get('q');
    this.query = query;
  }

  _handleSearchParamsChange () {
    this._updateQuery();
  }

  connectedCallback () {
    super.connectedCallback();
    this._updateQuery();
    window.addEventListener('vaadin-router-location-changed', this.searchParamsHandler);
  }

  disconnectedCallback () {
    window.removeEventListener('vaadin-router-location-changed', this.searchParamsHandler);
    super.disconnectedCallback();
  }

  static get styles () {
    return css`
      div {
        font-size: 1rem;
      }
    `;
  }

  render () {
    return html`<div>Search for: ${this.query}</div>`;
  }
}

customElements.define('tmdb-search', SearchPage);
