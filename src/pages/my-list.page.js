import '../components/my-list.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBMyListPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <h1 class='page-title'>Mi lista</h1>
      <tmdb-my-list></tmdb-my-list>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-my-list-page', TMDBMyListPage);
