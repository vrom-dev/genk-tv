import '../components/most-popular.component';

export class TMDBTvPopularPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <h1 class='page-title'>Programas de televisión populares</h1>
      <tmdb-most-popular type="tv"></tmdb-most-popular>`
    ;
  }
}

customElements.define('tmdb-tv-popular-page', TMDBTvPopularPage);
