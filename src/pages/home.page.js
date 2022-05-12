export class HomePage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = '<div></div>';
  }
}

customElements.define('tmdb-home', HomePage);
