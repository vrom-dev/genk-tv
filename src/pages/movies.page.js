export class TMDBMoviesPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-movies></div>';
  }
}

customElements.define('tmdb-movies', TMDBMoviesPage);
