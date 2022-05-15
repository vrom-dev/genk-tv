/* global cy */
/// <reference types="Cypress" />
describe('popular list of movies/tv-shows', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=the%20last%20kingdom&language=es-ES&region=ES&include_adult=false`,
      { fixture: './../../fixtures/multi_search.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/movies_genres.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/tv_genres.json' }
    );
    cy.visit('/search?q=the%20last%20kingdom');
  });

  it('displays a list of movies/tvshows', () => {
    cy
      .get('tmdb-search-results');
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
      .should('have.lengthOf', 3);
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
      .contains('The Last Kingdom');

    cy.get('@firstCard')
      .find('time')
      .contains('2015');

    cy.get('@firstCard')
      .find('li')
      .first()
      .contains('Action & Adventure');

    cy.get('@firstCard')
      .find('li')
      .contains('Drama');

    cy.get('@firstCard')
      .find('li')
      .contains('War & Politics');
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
      .contains('The Last Kingdom');
  });
});
