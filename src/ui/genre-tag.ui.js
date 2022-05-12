import { css, html, LitElement } from 'lit';

class TMDBTag extends LitElement {
  static get styles () {
    return css`
      span {
        background-color: hsla(0, 0%, 28%, 0.5);
        color: hsla(0, 0%, 100%, 0.8);
        padding: 0.3rem;
        font-size: 0.9rem;
        cursor: default;
      }
      span:hover {
        background-color: hsla(0, 0%, 28%, 0.8);

      }
    `;
  }

  render () {
    return html`<span>
      <slot></slot>
    </span>`;
  }
}

customElements.define('tmdb-tag', TMDBTag);
