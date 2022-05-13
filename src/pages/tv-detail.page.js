import '../components/element-details.component';

export class TMDBTVDetailsPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-element-detail type="tv"></tmdb-element-detail>';
  }
}

customElements.define('tmdb-tv-details-page', TMDBTVDetailsPage);
