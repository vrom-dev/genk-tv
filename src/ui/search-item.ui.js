import { html, css, LitElement } from 'lit';
import config from '../../api.config.json';
import { UtilsService } from '../services/utils.services';

import './single-card.ui';

export class TMDBSearchItemUi extends LitElement {
  static get properties () {
    return {
      element: {
        type: Object
      }
    };
  }

  static get styles () {
    return css`
      li {
        padding: 0.5rem;

      }      
      li:hover {
        background-color: #ccc;
      }
      .img-container {
        display: flex;
        align-items: center;
      }
      .img-container img {
        max-width: 36px;
      }
      .search-profile {
        flex-grow: 1;
        margin-left: 1rem;
      }
      .search-profile__link {
        color: inherit;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .search-profile__title {
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.25rem;
        margin: 0;
      }
      .search-profile__description {
        font-size: 0.8rem;
        line-height: 1.15rem;
        margin: 0;
        color: var(--text-color-secondary)
      }
      .rating {
        font-size: 1.2ch;
        margin: .4rem;
        padding: .3rem;
        border-radius: 0.25rem;
      }
      `;
  }

  render () {
    return html`
        <li>
          <a class='search-profile__link' href=${`/${this.element.media_type}/${this.element.id}/${UtilsService.slugify(this.element.title)}`}>
          <div class='img-container'>
            <img src='${config.BASE_URL_IMG}/w92/${this.element.poster_path}' alt=${this.element.title} />
          </div>
          <div class='search-profile'>
              <h2 class='search-profile__title'>${this.element.title}</h2>
              <p class='search-profile__description'>
                ${
                  this.element.overview
                  ? UtilsService.textShortener(this.element.overview)
                  : 'No existe una sinopsis disponible en español.'
                }
              </p>
            </div>
            <div>
              <span class='rating' style='background-color: ${UtilsService.getRatingColor(this.element.vote_average)}'>
                ${this.element.vote_average === 0 ? 'ND' : this.element.vote_average * 10}
              </span>
            </div>
          </a>
        </li>
    `;
  }
}

customElements.define('tmdb-search-item-ui', TMDBSearchItemUi);
