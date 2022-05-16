import '../components/detailed-view.component';

export class TMDBMovieDetailPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-detailed-view type="movie"></tmdb-detailed-view>
    `;
  }
}

customElements.define('tmdb-movie-detail-page', TMDBMovieDetailPage);
