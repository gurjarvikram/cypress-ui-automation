/// <reference types="cypress" />

import { loginObjects } from '../object-repository';

/**
 * Login page (`/`).
 *
 * Behaviour only — every selector comes from the object repository
 * (`cypress/support/object-repository/login.objects.js`).
 */
class LoginPage {
  visit() {
    cy.visit('/');
    cy.get(loginObjects.loginButton).should('be.visible');
  }

  fillUsername(username) {
    cy.get(loginObjects.username).clear().type(username);
  }

  fillPassword(password) {
    cy.get(loginObjects.password).clear().type(password, { sensitive: true });
  }

  submit() {
    cy.get(loginObjects.loginButton).click();
  }

  /**
   * Logs in through the UI.
   *
   * Deliberately not wrapped in `cy.session`: Swag Labs serves only `/`, and
   * every other route (`/inventory.html`, `/cart.html`, …) is resolved on the
   * client. A restored session cannot be followed by a deep-link `cy.visit()`
   * because the server answers those paths with a 404, so the form submit is
   * the only way to reach an authenticated page.
   */
  loginAs(username, password) {
    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  /**
   * Logs in as a named user from the `users` fixture.
   * These are the demo site's public credentials; for a real application load
   * them from the environment instead (see the README's Configuration section).
   */
  loginAsUser(role = 'standard') {
    cy.fixture('users').then((users) => {
      const user = users[role];
      expect(user, `user "${role}" exists in the users fixture`).to.not.be.undefined;
      this.loginAs(user.username, user.password);
    });
  }

  shouldShowError(message) {
    cy.get(loginObjects.error).should('be.visible').and('contain.text', message);
  }

  shouldBeOnLoginPage() {
    cy.url().should('not.include', '/inventory.html');
    cy.get(loginObjects.loginButton).should('be.visible');
  }
}

export default new LoginPage();
