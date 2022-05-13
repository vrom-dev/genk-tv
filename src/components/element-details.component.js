import { html, LitElement } from 'lit';
import { router } from '../router';
import { DetailsUseCase } from '../usecases/details.usecase';

import '../ui/element-detail-ui.js';

export class ElementDetailsComponent extends LitElement {
  static get properties () {
    return {
      location: {
        type: Object,
        state: true
      },
      id: {
        type: String,
        state: true
      },
      type: {
        type: String,
        attribute: true
      },
      element: {
        type: Object,
        state: true
      }
    };
  }

  async connectedCallback () {
    super.connectedCallback();
    this.location = router.location;
    this.id = this.location.params.id;
    const detailsUseCase = new DetailsUseCase();
    this.element = await detailsUseCase.execute({ id: this.id, type: this.type });
  }

  render () {
    return html`<tmdb-element-detail-ui .element=${this.element} type=${this.type}></tmdb-element-detail-ui>`;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-element-detail', ElementDetailsComponent);
