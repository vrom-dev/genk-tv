import '../components/detailed-view.component';

export class TMDBTVDetailPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-detailed-view type="tv"></tmdb-detailed-view>';
  }
}

customElements.define('tmdb-tv-detail-page', TMDBTVDetailPage);
