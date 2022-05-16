import '../components/search-results.component';
export class SearchResultsPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-search-results></tmdb-search-results>';
  }
}

customElements.define('tmdb-search-results-page', SearchResultsPage);
