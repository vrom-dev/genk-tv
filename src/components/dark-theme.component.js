import { LitElement, css, html } from 'lit';
import { getStoredTheme, updateTheme } from '../states/dark-theme.state';

export class DarkTheme extends LitElement {
  static get styles () {
    return css`
      :host {
        --size: 1.2rem;
        --icon-fill: var(--fill, hsla(42, 98%, 53%, 1));
        --icon-fill-hover: var(--fill-hover, hsla(36, 100%, 55%, 1));
      }
      .theme-toggle {
        background: none;
        border: none;
        padding: 0;
        inline-size: var(--size);
        block-size: var(--size);
        aspect-ratio: 1;
        border-radius: 50%;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        outline-offset: 5px;
      }
      .theme-toggle > svg {
        inline-size: 100%;
        block-size: 100%;
        stroke-linecap: round;
      }
      .sun-and-moon > :is(.moon, .sun, .sun-beams) {
        transform-origin: center center;
      }
      .sun-and-moon > :is(.moon, .sun) {
        fill: var(--icon-fill);
      }
      .theme-toggle:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) {
        fill: var(--icon-fill-hover);
      }
      .sun-and-moon > .sun-beams {
        stroke: var(--icon-fill);
        stroke-width: 2px;
      }
      .theme-toggle:is(:hover, :focus-visible) .sun-and-moon > .sun-beams {
        stroke: var(--icon-fill-hover);
      }
      
      [data-theme='light'] .sun-and-moon, 
      [data-theme='light'] .sun {
        transform: scale(1.75);
      }
      
      [data-theme='light'] .sun-beams {
        opacity: 0;
      }
      
      [data-theme='light'] .moon > circle {
        transform: translateX(-6px);
      }
      
      .sun-and-moon > .sun {
        transition: transform .5s cubic-bezier(.25,0,.3,1);
      }
      .sun-and-moon > .sun-beams {
        transition: 
        transform .5s cubic-bezier(.5,1.5,.75,1.25),
          opacity .5s cubic-bezier(.25,0,.3,1);
      }
      [data-theme='light'] .sun {
        transform: scale(1.75);
        transition-timing-function: cubic-bezier(.25,0,.3,1);
        transition-duration: .25s;
      }
      [data-theme='light'] .sun-beams {
        transform: rotateZ(-25deg);
        transition-duration: .15s;
      }
      .sun-and-moon .moon > circle {
        transition: transform .25s cubic-bezier(0,0,0,1);
      }
      [data-theme='light'] .sun-and-moon .moon > circle {
        transition-delay: .25s;
        transition-duration: .5s;
      }
    `;
  }

  connectedCallback () {
    super.connectedCallback();
    const root = document.querySelector('html');
    const savedTheme = getStoredTheme();
    if (savedTheme) {
      root.dataset.theme = savedTheme;
    }
  }

  firstUpdated () {
    const savedTheme = getStoredTheme();
    const svg = this.shadowRoot.querySelector('svg');
    if (savedTheme) {
      svg.dataset.theme = savedTheme;
    }
  }

  handleClick () {
    const root = document.querySelector('html');
    const svg = this.shadowRoot.querySelector('svg');
    const actualTheme = root.dataset.theme;
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
    root.dataset.theme = newTheme;
    svg.dataset.theme = newTheme;
  }

  render () {
    return html`
    <button 
      class='theme-toggle' 
      id='theme-toggle' 
      title='Toggles light and dark' 
      aria-label='auto'
      aria-live='polite'
      @click=${this.handleClick}
    >
      <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" data-theme='light'>
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
      </svg>
    </button>`;
  }
}

customElements.define('tmdb-dark-theme', DarkTheme);
