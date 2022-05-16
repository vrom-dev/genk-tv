import { LitElement, html } from 'lit';
import '../components/search-bar.component';
import './menu.ui';

export class TMDBFooter extends LitElement {
  render () {
    return html`
      <footer class='footer'>
        Made with <a href='https://lit.dev'>Lit</a> 💙 & ☕ 
        by <a href='https://www.linkedin.com/in/vromdev'>Víctor Romero</a>
      </footer>
    `;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-footer', TMDBFooter);
