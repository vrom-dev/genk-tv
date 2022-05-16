import { LitElement, html } from 'lit';
import '../components/search-bar.component';
import './menu.ui';

export class TMDBHeader extends LitElement {
  render () {
    return html`
      <header class="header">
        <div class="header__top-wrapper">
          <div class="header__top-bar">
            <div class="header__brand-name">
              GENK TV
            </div>
            <tmdb-menu-ui></tmdb-menu-ui>
          </div>
        </div>
        <div class="header__search-wrapper">
          <div class="header__search-bar">
            <tmdb-search-bar></tmdb-search-bar>
          </div>
        </div>
      </header>
    `;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-header', TMDBHeader);
