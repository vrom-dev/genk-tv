import '../components/element-details.component';

export class TMDBMovieDetailsPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-element-detail type="movie"></tmdb-element-detail>';
  }
}

customElements.define('tmdb-movie-details-page', TMDBMovieDetailsPage);
