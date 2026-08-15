/// <reference types="cypress" />

import { navigationObjects } from '../object-repository';

/** The burger-menu side navigation, available on every authenticated page. */
class NavigationMenu {
  open() {
    cy.get(navigationObjects.openButton).click();
    cy.get(navigationObjects.menu).should('have.attr', 'aria-hidden', 'false');
  }

  /**
   * Asserts the menu renders exactly the expected entries, in order.
   * The length assertion is what stops a partial match from passing silently.
   */
  shouldShowItems(expectedItems) {
    cy.get(navigationObjects.items).should('have.length', expectedItems.length);

    expectedItems.forEach((expected, index) => {
      cy.get(navigationObjects.items).eq(index).should('have.text', expected);
    });
  }

  logout() {
    cy.get(navigationObjects.logout).click();
  }

  resetAppState() {
    cy.get(navigationObjects.resetAppState).click();
  }
}

export default new NavigationMenu();
