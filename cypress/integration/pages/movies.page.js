/* global cy */
/// <reference types="Cypress" />
beforeEach(() => {
  cy.intercept(
    'GET',
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=es-ES&page=1&include_adult=false`,
    { fixture: './../../fixtures/popular_movies.json' }
  );
  cy.intercept(
    'GET',
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=es-ES`,
    { fixture: './../../fixtures/movies_genres.json' }
  );
  cy.visit('/movies');
});

it('displays a list of movies', () => {
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

it('displays a card with an image of the movie', () => {
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

it('the card has all movie info', () => {
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

it('movie info is not visible unless we mouse over the card', () => {
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

it('clicking in the movie card links to movie detail page', () => {
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
  cy.url().should('include', '/');
});
