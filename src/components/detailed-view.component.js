import { css, html, LitElement } from 'lit';
import { router } from '../router';

import { DetailedViewUseCase } from '../usecases/detailed-view.usecase';
import './recommendations.component';
import '../ui/detailed-view-ui';

export class DetailedViewComponent extends LitElement {
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
    const useCase = new DetailedViewUseCase();
    this.element = await useCase.execute({ id: this.id, type: this.type });
  }

  render () {
    return html`
        <tmdb-detailed-view-ui .element=${this.element} type=${this.type}></tmdb-detailed-view-ui>
        <tmdb-recommendations id=${this.id} type=${this.type}></tmdb-recommendations>
      `;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-detailed-view', DetailedViewComponent);
