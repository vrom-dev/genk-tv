import { html, css, LitElement } from 'lit';

import './single-card.ui';

export class TMDBCardListUi extends LitElement {
  static get properties () {
    return {
      list: {
        type: Object,
        state: true
      },
      genres: {
        type: Object,
        state: true
      }
    };
  }

  static get styles () {
    return css`
      ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
      }
      @media(max-width: 1367px) {
        ul {
          grid-template-columns: repeat(4, 1fr);
        } 
      }
      @media(max-width: 1044px) {
        ul {
          grid-template-columns: repeat(3, 1fr);
        } 
      }
      @media(max-width: 792px) {
        ul {
          grid-template-columns: repeat(2, 1fr);
        } 
      }
      @media(max-width: 536px) {
        ul {
          grid-template-columns: repeat(1, 1fr);
        } 
      }
    `;
  }

  render () {
    return html`
      <ul>
        ${this.list && this.list.elements.map(element => html`
            <li>
              <tmdb-single-card-ui .element=${element} .genres=${this.genres} type=${this.list.elementType}>
                ${element.title}
              </tmdb-single-card-ui>
            </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tmdb-cards-list-ui', TMDBCardListUi);
