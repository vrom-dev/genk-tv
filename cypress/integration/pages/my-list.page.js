import SNAPSHOT from '../../../fixtures/snapshot.json';
/* global cy */
/// <reference types="Cypress" />

describe('my list page', () => {
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
  it('add to list button is displayed and clickable', () => {
    cy.viewport(1400, 1200);
    cy
      .get('tmdb-detailed-view-ui')
      .shadow()
      .find('tmdb-add-list-button')
      .shadow()
      .findByRole('button')
      .as('addListButton');
    cy
      .get('@addListButton')
      .contains('Añadir a Mi lista');
    cy
      .get('@addListButton')
      .click();
    cy
      .get('@addListButton')
      .contains('Eliminar de Mi lista');
  });
});
describe('my list page (localstorage)', () => {
  beforeEach(() => {
    localStorage.setItem('genktv-my-list', JSON.stringify(SNAPSHOT));
    cy.visit('/my-list');
  });
  it('my list page displays the movies and tv shows stored in localstorage', () => {
    cy
      .get('tmdb-my-list')
      .children()
      .should('have.length', 2);
    cy
      .get('tmdb-cards-list-ui')
      .first()
      .shadow()
      .findByRole('list')
      .as('moviesList');
    cy
      .get('@moviesList')
      .children()
      .first()
      .contains('Red');
    cy
      .get('@moviesList')
      .children()
      .contains('El Padrino');
  });
});
