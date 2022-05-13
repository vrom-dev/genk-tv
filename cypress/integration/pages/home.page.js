/* global cy */
/// <reference types="Cypress" />

describe('home page', () => {
  it('user click button on home page', () => {
    cy.visit('/');
  });
});
