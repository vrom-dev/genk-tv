import '../components/most-popular.component';

export class TMDBTvPopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<tmdb-most-popular type="tv"></tmdb-most-popular>';
  }
}

customElements.define('tmdb-tv-popular-page', TMDBTvPopularPage);
