/* global cy */
/// <reference types="Cypress" />
describe('search bar component', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=the%20last%20kingdom&language=es-ES&region=ES&include_adult=false`,
      { fixture: './../../fixtures/multi_search.json' }
    );
    cy.visit('/');
  });

  it('displays a list of movies/tvshows', () => {
    cy
      .get('tmdb-search-bar')
      .shadow()
      .as('searchBar');
    cy
      .get('@searchBar')
      .findByRole('list')
      .as('resultsList');
    cy
      .get('@resultsList')
      .should('not.be.visible');
    cy
      .get('tmdb-search-bar')
      .shadow()
      .as('searchBar');
    cy
      .get('@searchBar')
      .findByRole('textbox')
      .type('the last kingdom');
    cy.wait(350);
    cy
      .get('@resultsList')
      .should('be.visible');
    cy
      .get('@resultsList')
      .children()
      .should('have.lengthOf', 4);
  });

  it('displays a card with the title, overview, rating and img of the movie/tvshow', () => {
    cy
      .get('tmdb-search-bar')
      .shadow()
      .as('searchBar');
    cy
      .get('@searchBar')
      .findByRole('textbox')
      .type('the last kingdom');
    cy.wait(350);
    cy
      .get('@searchBar')
      .findByRole('list')
      .find('tmdb-search-item-ui')
      .shadow()
      .first()
      .as('result');
    cy
      .get('@result')
      .contains('The Last Kingdom')
      .contains('La serie está ambientada en el siglo IX');
    cy
      .get('@result')
      .contains('82');
    cy
      .get('@result')
      .findByRole('img')
      .should('have.attr', 'alt', 'The Last Kingdom');
  });
  it('when clicking on a card it moves to the profile page of the movie/tvshow', () => {
    cy
      .get('tmdb-search-bar')
      .shadow()
      .as('searchBar');
    cy
      .get('@searchBar')
      .findByRole('textbox')
      .type('the last kingdom');
    cy.wait(350);
    cy
      .get('@searchBar')
      .findByRole('list')
      .find('tmdb-search-item-ui')
      .shadow()
      .first()
      .find('li')
      .as('result');
    cy
      .get('@result')
      .click();
    cy
      .url()
      .should('include', '/tv/63333/the-last-kingdom');
  });
  it('when clicking on "Ver todos los resultados" it goes to the search results page', () => {
    cy
      .get('tmdb-search-bar')
      .shadow()
      .as('searchBar');
    cy
      .get('@searchBar')
      .findByRole('textbox')
      .type('the last kingdom');
    cy.wait(350);
    cy
      .get('@searchBar')
      .findByRole('link')
      .as('seeAllResults');
    cy
      .get('@seeAllResults')
      .click();
    cy
      .url()
      .should('include', '/search?q=the%20last%20kingdom');
  });
});
