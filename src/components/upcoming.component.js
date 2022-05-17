import { html, LitElement } from 'lit';

import { UpcomingUseCase } from '../usecases/upcoming.usecase';
import '../ui/calendar.ui';

export class UpcomingComponent extends LitElement {
  static get properties () {
    return {
      results: {
        type: Object,
        state: true
      }
    };
  }

  async connectedCallback () {
    super.connectedCallback();
    const useCase = new UpcomingUseCase();
    const response = await useCase.execute();
    const { results } = response;
    this.results = results;
  }

  render () {
    return html`<tmdb-calendar .events=${this.results}></tmdb-calendar>`;
  }

  createRenderRoot () {
    return this;
  }
}

customElements.define('tmdb-upcoming', UpcomingComponent);
