import { css, html, LitElement } from 'lit';

class TMDBModalVideo extends LitElement {
  static get properties () {
    return {
      video: {
        type: String
      },
      isOpen: {
        type: Boolean,
        state: true
      }
    };
  }

  static get styles () {
    return css`
      *, *::after, *::before {
        box-sizing: border-box;
      }
      .modal {
        width: 992px;
        max-width: 100%;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: 0;
        border: none;
        background-color: var(--color-primary);
      }
      .modal__form {
        background-image: linear-gradient(to right, var(--color-secondary), var(--color-primary));
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
      }
      .modal__opener, .modal__button {
        background: none;
        border: none;
        color: var(--color-white);
        cursor: pointer;
      }
      .modal__opener {
        background-color: hsla(0, 0%, 28%, 1);
        padding: 0.3rem 0.5rem;
        display: inline-block;
        height: 2rem;
        font-size: 1.2rem;
      }
      .modal__opener:hover {
        background-color: hsla(0, 0%, 40%, 1);
      }
      .modal__button {
        font-size: .9rem;
        font-weight: 700;
      }
      .video-wrapper {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 */
        height: 0;
      }
      .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
      }
      
      @media(max-width: 992px) {
        .modal {
          max-width: calc(100% - 3rem);
        }
      }
    `;
  }

  toggleModal (e) {
    e.preventDefault();
    const dialog = this.shadowRoot.querySelector('dialog');
    const body = document.querySelector('body');
    body.classList.toggle('overflow-hidden');
    if (this.isOpen) {
      dialog.close();
      this.isOpen = false;
    } else {
      dialog.showModal();
      this.isOpen = true;
    }
  }

  render () {
    return html`
    <button @click=${this.toggleModal} class='modal__opener'>▶️ Ver tráiler</button>
    <dialog class='modal'>
      <form method="dialog" class='modal__form'>
        <button class='modal__button' @click=${this.toggleModal}>
          Cerrar
        </button>
      </form>
      <div class='video-wrapper'>
        ${this.isOpen && html`
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${this.video}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        `}
      </div>
    </dialog>`;
  }
}

customElements.define('tmdb-modal-video', TMDBModalVideo);
