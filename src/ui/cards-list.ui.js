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
      },
      ordered: {
        type: Boolean
      },
      scroll: {
        type: Number
      }
    };
  }

  static get styles () {
    return css`
      .cards__list {
        list-style: none;
        padding-left: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        place-items: center;
      }
      .cards__list-item {
        position: relative;
      }
      .position {
        display: none;
        font-size: 2rem;
        position: absolute;
        color: var(--color-white);
        bottom: 2rem;
        left: 1rem;
        z-index: 1;
        font-weight: 900;
        text-shadow:1px 1px 2px var(--color-primary);
      }
      :host([ordered]) .position {
        display: inherit
      }
      .cards__list-item:first-of-type > .position {
        font-size: 4rem;
      }
      .cards__list-item:nth-of-type(2) > .position {
        font-size: 3.5rem;
      }
      .cards__list-item:nth-of-type(3) > .position {
        font-size: 3rem;
      }
      :host([landscape]) .cards__list {
        display: flex;
        max-width: 100%;
        overflow-x: scroll;
        gap: 1rem;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
      }
       .cards__list::-webkit-scrollbar {
        display: block;
        height: 0.35rem;
      }

      .cards__list::-webkit-scrollbar-thumb {
        background-color: #DBDBDB;
      }
      
      @media(max-width: 1400px) {
        .cards__list {
          grid-template-columns: repeat(4, 1fr);
        } 
      }
      @media(max-width: 992px) {
        .cards__list {
          grid-template-columns: repeat(3, 1fr);
        } 
      }
      @media(max-width: 768px) {
        .cards__list {
          grid-template-columns: repeat(2, 1fr);
        } 
      }
      @media(max-width: 576px) {
        .cards__list {
          grid-template-columns: repeat(1, 1fr);
        } 
      }
    `;
  }

  render () {
    return html`
      <ul class='cards__list'>
        ${this.list && this.list.map((element, index) => html`
            <li class='cards__list-item'>
            <span class='position'>${index + 1}</span>
            <tmdb-single-card-ui .element=${element} .genres=${this.genres}>
              ${element.title}
            </tmdb-single-card-ui>
          </li>
        `)}
      </ul>
    `;
  }
}

customElements.define('tmdb-cards-list-ui', TMDBCardListUi);
