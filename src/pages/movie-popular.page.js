import '../components/most-popular.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBMoviePopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-header></tmdb-header>
      <main>
        <h1 class='mb-1'>Películas populares</h1>
        <p class='mb-4'>Top 20 de programas de televisión y series más populares del momento</p>
        <tmdb-most-popular type="movie"></tmdb-most-popular>
      </main>
      <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-movie-popular-page', TMDBMoviePopularPage);
