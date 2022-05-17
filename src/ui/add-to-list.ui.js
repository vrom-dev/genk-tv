import { css, html, LitElement } from 'lit';
import { subscribe } from 'valtio/vanilla';
import { myListState, isAddedToList, removeFromMyList, addToMyList } from '../states/my-list.state';

class TMDBAddToListComponent extends LitElement {
  static get properties () {
    return {
      isAdded: {
        type: Boolean,
        state: true
      },
      element: {
        type: Object
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
      .add-button {
        background-color: hsla(199, 80%, 40%, 1);
        color: hsla(0, 0%, 100%, 0.95);
        padding: 0.3rem 0.5rem;
        display: flex;
        align-items: center;
        height: 2rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 300ms ease;
        border: none;
      }
      .add-button:hover {
        background-color: hsla(199, 60%, 50%, 1);
      }
      .add-button--remove {
        background-color: hsla(354, 60%, 55%, 1);
      }
      .add-button--remove:hover {
        background-color: hsla(354, 70%, 55%, 1);
      }
    `;
  }

  toggleAddToList () {
    if (this.isAdded) {
      removeFromMyList(this.element, this.type);
      return;
    }
    addToMyList(this.element, this.type);
  }

  connectedCallback () {
    super.connectedCallback();
    this.isAdded = isAddedToList(this.element, this.type);
    subscribe(myListState, () => {
      this.isAdded = isAddedToList(this.element, this.type);
    });
  }

  render () {
    return html`
      <button class='add-button ${this.isAdded ? 'add-button--remove' : ''}' @click=${this.toggleAddToList}>
        ${!this.isAdded ? html`+ Añadir a Mi lista` : html`- Eliminar de Mi lista`}
      </button>   `;
  }
}

customElements.define('tmdb-add-list-button', TMDBAddToListComponent);
