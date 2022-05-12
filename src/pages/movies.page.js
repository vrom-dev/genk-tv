import '../components/popular-movies.component';

export class TMDBMoviesPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-popular-movies></tmdb-popular-movies>';
  }
}

customElements.define('tmdb-movies', TMDBMoviesPage);
