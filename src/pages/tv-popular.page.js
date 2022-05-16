import '../components/most-popular.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBTvPopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <h1 class='page-title'>Programas de televisión populares</h1>
      <tmdb-most-popular type="tv"></tmdb-most-popular>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-tv-popular-page', TMDBTvPopularPage);
