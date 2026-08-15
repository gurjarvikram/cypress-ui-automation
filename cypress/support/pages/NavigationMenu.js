/// <reference types="cypress" />

/** The burger-menu side navigation, available on every authenticated page. */
class NavigationMenu {
  selectors = Object.freeze({
    openButton: '#react-burger-menu-btn',
    closeButton: '#react-burger-cross-btn',
    menu: '.bm-menu-wrap',
    items: '.bm-item-list a',
    allItems: '[data-test="inventory-sidebar-link"]',
    about: '[data-test="about-sidebar-link"]',
    logout: '[data-test="logout-sidebar-link"]',
    resetAppState: '[data-test="reset-sidebar-link"]',
  });

  open() {
    cy.get(this.selectors.openButton).click();
    cy.get(this.selectors.menu).should('have.attr', 'aria-hidden', 'false');
  }

  /**
   * Asserts the menu renders exactly the expected entries, in order.
   * The length assertion is what stops a partial match from passing silently.
   */
  shouldShowItems(expectedItems) {
    cy.get(this.selectors.items).should('have.length', expectedItems.length);

    expectedItems.forEach((expected, index) => {
      cy.get(this.selectors.items).eq(index).should('have.text', expected);
    });
  }

  logout() {
    cy.get(this.selectors.logout).click();
  }

  resetAppState() {
    cy.get(this.selectors.resetAppState).click();
  }
}

export default new NavigationMenu();
