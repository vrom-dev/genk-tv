import '../components/trending.component';
import '../components/top-rated.component';
import '../ui/header.ui';
import '../ui/footer-ui';

export class HomePage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <tmdb-header></tmdb-header>
      <main>
        <h1 class='cta-title'>Bienvenidos.</h1>
        <p class='cta-description'>Millones de películas, programas de televisión y personas por descubrir. Explora ahora.</p>
        <section>
          <h2>Tendencias: Películas</h2>
          <tmdb-trending type='movie'></tmdb-trending>
        </section>
        <section>
          <h2>Tendencias: Programas de televisión y series</h2>
          <tmdb-trending type='tv'></tmdb-trending>
        </section>
        <section>
          <h2>Lo más valorado: Películas</h2>
          <tmdb-top-rated type='movie'></tmdb-top-rated>
        </section>
        <section>
          <h2>Lo más valorado: Programas de televisión y series</h2>
          <tmdb-top-rated type='tv'></tmdb-top-rated>
        </section>
      </main>
      <tmdb-footer></tmdb-footer>
    `;
  }
}

customElements.define('tmdb-home', HomePage);
