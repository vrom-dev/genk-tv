import '../components/detailed-view.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBMovieDetailPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-header></tmdb-header>
      <main>
        <tmdb-detailed-view type="movie"></tmdb-detailed-view>
      </main>
      <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-movie-detail-page', TMDBMovieDetailPage);
