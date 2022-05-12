import { css, html, LitElement } from 'lit';
import './genre-tag.ui';

import { UtilsService } from '../services/utils.services';
import config from '../../api.config.json';

export class TMDBCardUi extends LitElement {
  static get properties () {
    return {
      element: {
        type: Object,
        state: true
      },
      type: {
        type: String
      },
      genres: {
        type: Object,
        state: true
      },
      show: {
        type: Boolean,
        state: true
      }
    };
  }

  static get styles () {
    return css`
      .card {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        text-align: center;
        width: 220px;
        height: 330px;
        margin-bottom: 1rem;
        overflow: hidden;
        border-radius: 0.25rem;
        color: #fff;
        cursor: pointer;
        position:relative;
      }
      .front {
        margin: 0;
      }
      .profile{
        transition: transform 0.2s ease;
      }
      .card:hover .profile{
        transform:scale(125%);
      }
      .back{
        position:absolute;
        background-color: hsla(222, 47%, 11%, 0.8);
        height: 100%;
        transition: transform 1000ms ease;
        z-index:1;
        padding:10px;
        right: 0;
        transform: translateX(120%);
        top:0;
      }
      .card:hover .back {
        transform: translateX(0%);
        right:0;
      }
      .des{
        font-size: 0.9rem;
        padding: 0px 0px;
      }
      h2 {
        margin: 1rem 0 0.5rem;
      }
      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        justify-content: center;
        align-items: center;
      }
      li {
        padding: 0.4rem 0.2rem;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        color: var(--color-secondary);
      }
      time {
        font-size: 0.9rem
      }
    `;
  }

  handleClick () {
    const link = this.shadowRoot.querySelector('a');
    link.click();
  }

  render () {
    return html`
      <article class="card">
        <div>
          <header class="back" @click=${this.handleClick}>
            <a href=${`/${this.type}/${this.element.id}/${UtilsService.slugify(this.element.title)}`}>
              <h2>${this.element.title}</h2>
            </a>
            <time>${new Date(this.element.release_date).getFullYear()}</time>
            <ul>${this.element.genre_ids.map(genre => html`<li><tmdb-tag>${this.genres[genre]}</tmdb-tag></li>`)}</ul>
            <p class="des">
              ${UtilsService.textShortener(this.element.overview)}
            </p>
          </header>
          <figure class="front">
            <img class="profile" loading="lazy" src=${`${config.BASE_URL_IMG}/w220_and_h330_face/${this.element.poster_path}`} alt=${`${this.element.title} - Poster path`}>
          </figure>
        </div>
      </article>`;
  }
}

customElements.define('tmdb-single-card-ui', TMDBCardUi);
