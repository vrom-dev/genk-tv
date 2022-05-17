import '../components/upcoming.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class TMDBUpcomingPage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
    <tmdb-header></tmdb-header>
    <main>
      <h1 class='page-title centered'>Próximos estrenos</h1>
      <tmdb-upcoming></tmdb-upcoming>
    </main>
    <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-upcoming-page', TMDBUpcomingPage);
