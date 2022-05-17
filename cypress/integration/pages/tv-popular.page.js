/* global cy */
/// <reference types="Cypress" />
describe('popular list of movies/tv-shows', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=es-ES&page=1&region=ES&include_adult=false`,
      { fixture: './../../fixtures/tvshow_popular.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/tv_genres.json' }
    );
    cy.visit('/tv');
  });

  it('displays a list of tvshows', () => {
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

  it('displays a card with an image of the tvshow', () => {
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

  it('the card has all tvshow info', () => {
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
      .contains('Halo');

    cy.get('@firstCard')
      .find('time')
      .contains('2022');

    cy.get('@firstCard')
      .find('li')
      .first()
      .contains('Action & Adventure');

    cy.get('@firstCard')
      .find('li')
      .contains('Sci-Fi');
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
      .contains('Halo');
  });
});
