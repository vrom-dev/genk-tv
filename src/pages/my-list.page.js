import '../components/my-list.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBMyListPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <h1 class='mb-1'>Mi lista</h1>
      <p class='mb-4'>En tu lista puedes guardar tus películas y programas de televisión favoritos</p>
      <tmdb-my-list></tmdb-my-list>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-my-list-page', TMDBMyListPage);
