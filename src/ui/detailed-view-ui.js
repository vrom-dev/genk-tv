import { css, html, LitElement } from 'lit';
import apiConfig from '../../api.config.json';
import './modal-video.ui';

class TMDBDetailedViewUi extends LitElement {
  static get properties () {
    return {
      element: {
        type: Object,
        state: true
      },
      type: {
        type: String
      }
    };
  }

  static get styles () {
    return css`
      *, *::after, *::before {
        box-sizing: border-box;
      }
      .detail {
        width: 100%;
        margin-top: 10rem;
      }
      .detail__link {
        text-decoration: none;
        color: inherit;
      }
      .detail__content {
        display: flex;
      }
      .content__wrapper {
        margin-top: 8rem;
        padding: 2rem;
      }
      .detail__poster {
        order: -1;
        margin: 0;
      }
      .poster__img {
        border-radius: 0.35rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        width: 300px;
        animation: 1s poster-fade-in ease;
      }
      .detail__header {
        color: #fff;
        display: flex;
        flex-direction: column;
      }
      .detail__backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 650px;
        overflow: hidden;
        background-size: cover;
        z-index: -1;
        display: flex;
        background-image: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      }
      .detail__backdrop > img {
        width: 100%;
        z-index: -1;
        opacity: 0.7;
        filter: grayscale(80%);
        object-fit: cover;
        animation: 1s backdrop-fade-in ease;
      }
      .detail__title {
        font-size: 3rem;
        margin: .5rem 0;
      }
      .detail__date {
        font-size: 2rem;
        font-weight: 400;
      }
      .detail__list {
        margin-bottom: 0;
        padding-left: 0;
        gap: .2rem;
        list-style: none;
        display: flex;
        align-items: center;
      }
      .vote-average {
        background: hsla(199, 50%, 48%, .9);
        color: hsla(0, 0%, 100%, 0.95);
        padding: 0.3rem 0.5rem;
        display: flex;
        align-items: center;
        height: 2rem;
        font-size: 1.2rem;
        cursor: pointer;
      }
      .vote-average:hover {
        background-color: hsla(199, 89%, 48%, 1);
      }
      .vote-average__rating {
        font-weight: 700;
      }
      .detail__overview {
        border-radius: 0.15rem 0.15rem 0 0;
        color: var(--text-color-secondary);
        background-color: var(--bg-color);
        padding: 1rem;
        line-height: 1.5rem;
      }
      .overview__title {
        display: block;
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: .8rem;
      }
      @keyframes backdrop-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 0.7;
        }
      }
      @keyframes poster-fade-in {
        from {
          opacity: 0;
          filter: blur(2px);
        }
        to {
          opacity: 1;
          filter: blur(0);
        }
      }
      @media (max-width: 992px) {
        .content__wrapper {
          padding: 0;
        }
        .poster__img {
          max-width: 220px;
          margin-top: 5rem;
          border-radius: 0.25rem;
        }
      }
      @media (max-width: 768px) {
        .detail {
          margin-top: 2rem;
        }
        .poster__img {
          max-width: 150px;
          margin-top: 0;
          margin-left: 2rem;
        }
        .detail__title {
          font-size: 2rem;
        }
        .detail__list {
          flex-wrap: wrap;
        }
        .detail__list-item {
          padding-bottom: .7rem;
        }
        .detail__content {
          flex-direction: column;
        }
        .content__wrapper {
          margin-top: 0;
        }
      }
    `;
  }

  render () {
    return this.element && html`
    <section class='detail'>
      <div class='detail__backdrop'>
        <img src='${apiConfig.BASE_URL_IMG}/original/${this.element.backdrop_path}' alt=${this.element.title}></img>
      </div>
      <div class='detail__content'>
        <div class='content__wrapper'>
          <header class='detail__header'>
            <h1 class='detail__title'>
              ${this.element.title}
              <time class='detail__date'>(${new Date(this.element.release_date).getFullYear()})</time>
            </h1>
            <ul class='detail__list'>${this.element.genres.map(genre => html`<li class='detail__list-item'><tmdb-tag>${genre.name}</tmdb-tag></li>`)}</ul>
            <ul class='detail__list'>
              ${this.element.trailer && html`<li><tmdb-modal-video video=${this.element.trailer.key}></tmdb-modal-video></li>`}
              <li class='vote-average'>
                <a href='https://www.themoviedb.org/${this.type}/${this.element.id}' class='detail__link' target='_blank'>
                  <span class='vote-average__rating'>${this.element.vote_average}
                  </span> TMDb
                </a>
              </li>
              <li class='vote-average'>Añadir a mi lista</li>
            </ul>
          </header>
          <p class='detail__overview'>
            <span class='overview__title'>Sinopsis:</span>
            ${this.element.overview || 'No existe una sinopsis en español. Puedes ayudar a TMDB a ampliar su base de datos añadiendo una.'}
          </p>
        </div>
        <figure class='detail__poster'>
          <img class='poster__img' src='${apiConfig.BASE_URL_IMG}/w300_and_h450_bestv2/${this.element.poster_path}' alt=${this.element.title} />
        </figure>
      </div>
    </section>
    `;
  }
}

customElements.define('tmdb-detailed-view-ui', TMDBDetailedViewUi);
