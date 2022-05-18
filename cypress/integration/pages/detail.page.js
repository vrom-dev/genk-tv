/* global cy */
/// <reference types="Cypress" />
describe('detailed movies/tv-show', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/movie/508947?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES',
      { fixture: './../../fixtures/movie_detail.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/movie/508947/videos?api_key=64a40f1d1740c362639f6b91739db0ca',
      { fixture: './../../fixtures/movie_videos.json' }
    );
    cy.visit('/movie/508947/red');
  });
  it('displays detailed info of the movie/tv-show', () => {
    cy
      .get('tmdb-detailed-view-ui')
      .shadow()
      .as('movieInfo');
    cy
      .get('@movieInfo')
      .findByRole('heading')
      .contains('Red');
    cy
      .get('@movieInfo')
      .find('time')
      .contains('2022');
    cy
      .get('@movieInfo')
      .find('img')
      .should('have.attr', 'alt', 'Red');
    cy
      .get('@movieInfo')
      .find('ul')
      .contains('Comedia');
    cy
      .get('@movieInfo')
      .find('p')
      .contains('Mei Lee, una niña de 13 años un poco rara pero segura de sí misma, se debate entre ser la hija obediente que su madre quiere que sea y el caos propio de la adolescencia. Ming, su protectora y ligeramente exigente madre, no se separa nunca de ella lo que es una situación poco deseable para una adolescente. Y por si los cambios en su vida y en su cuerpo no fueran suficientes, cada vez que se emociona demasiado (lo que le ocurre prácticamente todo el tiempo), se convierte en un panda rojo gigante.');
  });
  it('can open a modal window with the trailer of the movie/tv-show', () => {
    cy.viewport(1600, 1400);
    cy
      .get('tmdb-detailed-view-ui')
      .shadow()
      .as('movieInfo');
    cy
      .get('@movieInfo')
      .find('tmdb-modal-video')
      .shadow()
      .as('modalVideo');
    cy
      .get('@modalVideo')
      .find('dialog')
      .should('exist')
      .should('not.be.visible');
    cy
      .get('@modalVideo')
      .findByRole('button')
      .contains('Ver tráiler')
      .click();
    cy
      .get('@modalVideo')
      .findByRole('dialog')
      .should('exist')
      .should('be.visible')
      .should('have.attr', 'open');
    cy
      .get('@modalVideo')
      .findByRole('dialog')
      .find('iframe')
      .should('be.visible');
    cy
      .get('@modalVideo')
      .findByRole('dialog')
      .findByRole('button')
      .contains('Cerrar');
    cy
      .get('@modalVideo')
      .findByRole('dialog')
      .findByRole('button')
      .click();
    cy
      .get('@modalVideo')
      .find('dialog')
      .should('exist')
      .should('not.be.visible')
      .should('not.have.attr', 'open');
  });
});
