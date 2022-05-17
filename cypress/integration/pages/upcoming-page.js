/* global cy */
/// <reference types="Cypress" />

describe('upcoming page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=es-ES&region=ES&include_adult=false`,
      { fixture: './../../fixtures/upcoming.json' }
    );
    cy.visit('/upcoming');
  });
  it('calendar is displayed with current month', () => {
    cy
      .get('tmdb-calendar')
      .shadow()
      .as('calendar');
    cy
      .get('@calendar')
      .contains(new Date().getFullYear().toString());
    cy
      .get('@calendar')
      .contains(new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date()));
    cy
      .get('@calendar')
      .find('span')
      .first()
      .should('have.attr', 'data-hint', 'El sastre de la mafia');
  });

  it('can change to next month', () => {
    cy.viewport(1600, 1400);
    cy
      .get('tmdb-calendar')
      .shadow()
      .as('calendar');
    cy
      .get('@calendar')
      .find('button')
      .contains('>')
      .click();
    cy
      .get('@calendar')
      .contains(new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date().setMonth(new Date().getMonth() + 1))); // Next Month
  });

  it('can change to prev month', () => {
    cy.viewport(1600, 1400);
    cy
      .get('tmdb-calendar')
      .shadow()
      .as('calendar');
    cy
      .get('@calendar')
      .find('button')
      .contains('<')
      .click();
    cy
      .get('@calendar')
      .contains(new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date().setMonth(new Date().getMonth() - 1))); // Next Month
  });
});
