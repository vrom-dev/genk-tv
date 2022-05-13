import { css, html, LitElement } from 'lit';
import '../components/dark-theme.component';

class TMDBMenuUi extends LitElement {
  static get properties () {
    return {
      isOpen: {
        state: true,
        type: Boolean
      }
    };
  }

  static get styles () {
    return css`
      :host {
        --menu-bg-color: var(--bg-color);
        --menu-text-color-primary: var(--text-color-primary);
        --menu-text-color-secondary: var(--color-secondary);
        --menu-margin: 1rem;
        --menu-size: 2rem;
      }
      *, *::after, *::before {
        box-sizing: border-box;
      }
      .menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: var(--menu-margin);
        height: var(--menu-size);
        position: relative;
      }
      .menu__list {
        display: flex;
        list-style: none;
        padding-left: 0;
        margin-right: 2rem;
      }
      .menu__link {
        text-decoration: none;
        font-size: 1.1rem;
        font-weight: 600;
        line-height: 1.1rem;
        padding: 1rem;
        display: block;
        color: var(--menu-text-color-primary);
      }
      .menu__link:hover {
        color: var(--menu-text-color-secondary);
      }
      .menu__button {
        display: none;
      }
      tmdb-dark-theme {
        display: flex;
      }
      @media (max-width: 666px) {
        .menu__button {
          display: block;
          border: none;
          background-color: transparent;
          cursor: pointer;
          width: 2.5rem;
          height: 2.5rem;
          position: relative;
          order: 2;
          margin-left: 1.5rem;
        }
        .menu__button::before {
          content: '';
          display: block;
          position: absolute;
          width: 1.8rem;
          height: 0.25rem;
          border-radius: 0.5rem;
          background-color: var(--menu-text-color-primary);
          bottom: .7rem;
          transition: transform 300ms ease-in,
                      bottom 300ms ease-in;
        }
        .menu__button::after {
          content: '';
          display: block;
          position: absolute;
          width: 1.8rem;
          height: 0.25rem;
          border-radius: 0.5rem;
          background-color: var(--menu-text-color-primary);
          top: .7rem;
          transition: transform 300ms ease-in,
                      top 300ms ease-in;
        }
        .menu__button--open::before {
          transform: rotate(135deg);
          bottom: 1.1rem;
          transition: transform 300ms ease-in,
                      bottom 300ms ease-in;
        }
        .menu__button--open::after {
          transform: rotate(-135deg);
          top: 1.1rem;
          transition: transform 300ms ease-in,
                      top 300ms ease-in;
        }
        .menu__list {
          background-color: var(--menu-bg-color); 
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: calc(var(--menu-size) + var(--menu-margin));
          left: 0;
          flex-direction: column;
          transform: translateX(120%);
          transition: transform 300ms linear;
          z-index: 10;
        }
        .menu__list--open {
          transform: translateX(10%);
          transition: transform 300ms linear;
        }
        .menu__item {
          width: 100%;
        }
        .menu__link {
          padding-left: 3rem;
        }
      }
    `;
  }

  _toggleOpen () {
    const list = this.shadowRoot.querySelector('.menu__list');
    const button = this.shadowRoot.querySelector('.menu__button');
    list.classList.toggle('menu__list--open');
    button.classList.toggle('menu__button--open');
    this._isOpen = !this._isOpen;
    if (this._isOpen) {
      button.setAttribute('aria-expanded', true);
    } else {
      button.removeAttribute('aria-expanded');
    }
  }

  _handleScroll () {
    if (this._isOpen) {
      this._toggleOpen();
    }
  }

  connectedCallback () {
    super.connectedCallback();
    window.addEventListener('scroll', this._handleScroll.bind(this));
  }

  disconnectedCallback () {
    window.removeEventListener('scroll', this._handleScroll.bind(this));
    super.disconnectedCallback();
  }

  render () {
    return html`
      <nav class='menu'>
        <button
          id='menubutton'
          class='menu__button' @click=${this._toggleOpen}
          aria-haspopup='true'
          aria-controls='menu'
        ></button> 
        <ul
          id='menu' 
          class='menu__list'
          role='menu'
          aria-labelledby='menubutton'
        >
          <li class='menu__item' role='none' @click=${this._toggleOpen}>
            <a class='menu__link' role='menuitem' href='/trending'>Trending</a>
          </li>
          <li class='menu__item' role='none' @click=${this._toggleOpen}>
            <a class='menu__link' role='menuitem' href='/movie'>Películas</a>
          </li>
          <li class='menu__item' role='none' @click=${this._toggleOpen}>
            <a class='menu__link' role='menuitem' href='/tv'>TV</a>  
          </li>
        </ul>
        <tmdb-dark-theme></tmdb-dark-theme> 
      </nav>
    `;
  }
}

customElements.define('tmdb-menu-ui', TMDBMenuUi);
