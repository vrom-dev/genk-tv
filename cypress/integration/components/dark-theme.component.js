/* global cy */
/// <reference types="Cypress" />
describe('dark theme component', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/508947?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/movie_detail.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/508947/videos?api_key=${process.env.API_KEY}`,
      { fixture: './../../fixtures/movie_videos.json' }
    );
    cy.visit('/movie/508947/red');
  });
  it('displays a button to toggle theme', () => {
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .as('menu');
    cy
      .get('@menu')
      .find('tmdb-dark-theme')
      .shadow()
      .find('button')
      .as('darkThemeButton');
    cy
      .get('@darkThemeButton')
      .should('be.visible')
      .should('exist');
  });
  it('toggles data-theme in the html root', () => {
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .as('menu');
    cy
      .get('@menu')
      .find('tmdb-dark-theme')
      .shadow()
      .find('button')
      .as('darkThemeButton');
    cy
      .get('html')
      .should('have.attr', 'data-theme', 'light');
    cy
      .get('@darkThemeButton')
      .click();
    cy
      .get('html')
      .should('have.attr', 'data-theme', 'dark');
  });
});

describe('dark theme component (state)', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/508947?api_key=${process.env.API_KEY}&language=es-ES`,
      { fixture: './../../fixtures/movie_detail.json' }
    );
    cy.intercept(
      'GET',
      `https://api.themoviedb.org/3/movie/508947/videos?api_key=${process.env.API_KEY}`,
      { fixture: './../../fixtures/movie_videos.json' }
    );
    window.localStorage.setItem('genktv-theme', '{"current":"dark"}');
    cy.visit('/movie/508947/red');
  });
  it('it loads theme from localstorage if available', () => {
    cy.wait(100);
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .as('menu');
    cy
      .get('@menu')
      .find('tmdb-dark-theme')
      .shadow()
      .find('button')
      .as('darkThemeButton');
    cy
      .get('html')
      .should('have.attr', 'data-theme', 'dark');
  });
});
