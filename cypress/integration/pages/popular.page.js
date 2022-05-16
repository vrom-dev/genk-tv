/* global cy */
/// <reference types="Cypress" />
describe('popular list of movies/tv-shows', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=es-ES&page=1&region=ES&include_adult=false`,
      { fixture: './../../fixtures/popular_movies.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/movies_genres.json' }
    );
    cy.visit('/movie');
  });

  it('displays a list of movies/tvshows', () => {
    cy
      .get('tmdb-most-popular')
      .should('have.attr', 'type');
    cy
      .get('tmdb-cards-list-ui')
      .shadow()
      .as('cardsList');
    cy
      .get('@cardsList')
      .find('tmdb-single-card-ui')
      .shadow()
      .first()
      .as('firstCard');

    cy.get('@cardsList')
      .find('ul')
      .children()
      .should('have.lengthOf', 20);
  });

  it('displays a card with an image of the movie/tvshow', () => {
    cy
      .get('tmdb-cards-list-ui')
      .shadow()
      .find('tmdb-single-card-ui')
      .shadow()
      .first()
      .as('firstCard');

    cy.get('@firstCard')
      .find('img')
      .should('exist')
      .should('be.visible');
  });

  it('the card has all movie/tvshow info', () => {
    cy
      .get('tmdb-cards-list-ui')
      .shadow()
      .find('tmdb-single-card-ui')
      .shadow()
      .first()
      .as('firstCard');

    cy.get('@firstCard')
      .find('header')
      .find('h2')
      .contains('Sonic 2: La Película');

    cy.get('@firstCard')
      .find('time')
      .contains('2022');

    cy.get('@firstCard')
      .find('li')
      .first()
      .contains('Acción');

    cy.get('@firstCard')
      .find('li')
      .contains('Aventura');

    cy.get('@firstCard')
      .find('li')
      .contains('Aventura');
  });

  it('info is not visible unless we mouse over the card', () => {
    cy
      .get('tmdb-cards-list-ui')
      .shadow()
      .find('tmdb-single-card-ui')
      .shadow()
      .first()
      .as('firstCard');

    cy.get('@firstCard')
      .find('header')
      .should('exist')
      .should('not.be.visible');

    cy.get('@firstCard')
      .find('header')
      .trigger('mouseover')
      .should('be.visible');
  });

  it('clicking in the card links to detail page of the resource', () => {
    cy
      .get('tmdb-cards-list-ui')
      .shadow()
      .find('tmdb-single-card-ui')
      .shadow()
      .first()
      .as('firstCard');

    cy.get('@firstCard')
      .find('header')
      .click();
    cy
      .get('tmdb-detailed-view-ui')
      .shadow()
      .as('movieInfo');
    cy
      .get('@movieInfo')
      .findByRole('heading')
      .contains('Sonic');
  });
});
