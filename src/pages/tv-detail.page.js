import '../components/detailed-view.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBTVDetailPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <tmdb-detailed-view type="tv"></tmdb-detailed-view>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-tv-detail-page', TMDBTVDetailPage);
