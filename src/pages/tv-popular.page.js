import '../components/most-popular.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBTvPopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <h1 class='mb-1'>Programas de televisión populares</h1>
      <p class='mb-4'>Top 20 de programas de televisión y series más populares del momento</p>
      <tmdb-most-popular type="tv"></tmdb-most-popular>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-tv-popular-page', TMDBTvPopularPage);
