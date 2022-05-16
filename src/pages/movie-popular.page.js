import '../components/most-popular.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBMoviePopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-header></tmdb-header>
      <main>
        <h1 class='page-title'>Películas populares</h1>
        <tmdb-most-popular type="movie"></tmdb-most-popular>
      </main>
      <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-movie-popular-page', TMDBMoviePopularPage);
