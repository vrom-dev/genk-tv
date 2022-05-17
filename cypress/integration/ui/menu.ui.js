/* global cy */
/// <reference types="Cypress" />

describe('responsive menu ui', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('in desktop view, menu items are visible', () => {
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('ul')
      .as('menu');
    cy
      .get('@menu')
      .should('be.visible');
    cy
      .get('@menu')
      .children()
      .should('have.lengthOf', 5);
    cy
      .get('@menu')
      .contains('TV');
    cy
      .get('@menu')
      .contains('Películas');
  });

  it('in desktop view, menu button is not visible', () => {
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .should('not.be.visible');
  });

  it('in desktop view, menu items are visible', () => {
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('ul')
      .as('menu');
    cy
      .get('@menu')
      .should('be.visible');
    cy
      .get('@menu')
      .children()
      .should('have.lengthOf', 5);
    cy
      .get('@menu')
      .contains('TV');
    cy
      .get('@menu')
      .contains('Películas');
    cy
      .get('@menu')
      .contains('Mi Lista');
  });

  it('in mobile view, menu button is visible', () => {
    cy.viewport('iphone-xr');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .should('be.visible');
  });

  it('in mobile view, menu items are visible when button is clicked', () => {
    cy.viewport('iphone-x');
    cy.wait(400);
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .findByRole('menu')
      .should('not.be.visible');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .click();
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .should('have.attr', 'aria-expanded');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .click()
      .should('not.have.attr', 'aria-expanded');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .findByRole('menu')
      .should('not.be.visible');
  });

  it('in mobile view, if menu is opened, it closes when scrolling', () => {
    cy.viewport('iphone-x');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .click()
      .should('have.attr', 'aria-expanded');
    cy.wait(400);
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .findByRole('menu')
      .should('be.visible');
    cy.scrollTo(0, 500);
    cy.wait(400);
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .find('button')
      .should('not.have.attr', 'aria-expanded');
    cy
      .get('tmdb-menu-ui')
      .shadow()
      .findByRole('menu')
      .should('not.be.visible');
  });
});
