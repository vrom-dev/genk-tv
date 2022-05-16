import '../components/most-popular.component';

export class TMDBMoviePopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <h1 class='page-title'>Películas populares</h1>
    <tmdb-most-popular type="movie"></tmdb-most-popular>
    `;
  }
}

customElements.define('tmdb-movie-popular-page', TMDBMoviePopularPage);
