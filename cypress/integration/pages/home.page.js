/* global cy */
/// <reference types="Cypress" />

describe('home page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/trending/movie/day?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false',
      { fixture: './../../fixtures/movies_trending.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/genre/movie/top_rated?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false',
      { fixture: './../../fixtures/movies_toprated.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/trending/tv/day?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false',
      { fixture: './../../fixtures/tvshow_trending.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/genre/tv/top_rated?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES&include_adult=false',
      { fixture: './../../fixtures/tvshow_toprated.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/genre/movie/list?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES',
      { fixture: './../../fixtures/movies_genres.json' }
    );
    cy.intercept(
      'GET',
      'https://api.themoviedb.org/3/genre/tv/list?api_key=64a40f1d1740c362639f6b91739db0ca&language=es-ES',
      { fixture: './../../fixtures/tv_genres.json' }
    );
    cy.visit('/');
  });
  it('displays home page with 4 sections', () => {
    cy
      .get('main')
      .as('main');
    cy
      .get('@main')
      .contains('Bienvenidos');
    cy
      .get('@main')
      .find('section')
      .should('have.length', 4);
    cy
      .get('@main')
      .find('section')
      .find('tmdb-trending');
    cy
      .get('@main')
      .find('section')
      .find('h2');
  });
  it('each section has a list of cards displayed in landscape mode', () => {
    cy
      .get('main')
      .as('main');
    cy
      .get('@main')
      .find('section')
      .first()
      .find('tmdb-cards-list-ui')
      .should('have.attr', 'landscape');
  });
});
