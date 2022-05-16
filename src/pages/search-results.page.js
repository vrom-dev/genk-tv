import '../components/search-results.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class SearchResultsPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-header></tmdb-header>
      <main>
        <tmdb-search-results></tmdb-search-results>
      </main>
      <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-search-results-page', SearchResultsPage);
