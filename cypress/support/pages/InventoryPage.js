/// <reference types="cypress" />

import { inventoryObjects } from '../object-repository';

/** Product listing page (`/inventory.html`), shown after a successful login. */
class InventoryPage {
  shouldBeLoaded() {
    cy.url().should('include', '/inventory.html');
    cy.get(inventoryObjects.title).should('have.text', 'Products');
  }

  /** Yields the visible product names, in the order the page renders them. */
  productNames() {
    return cy
      .get(inventoryObjects.itemName)
      .then(($names) => Cypress._.map($names, (el) => el.innerText.trim()));
  }

  selectSortOption(option) {
    cy.get(inventoryObjects.sortContainer).select(option);
    cy.get(inventoryObjects.activeSortOption).should('have.text', option);
  }

  /**
   * Asserts the rendered order matches the names sorted locally, so the
   * expectation is derived from the data rather than restated from the DOM.
   */
  shouldBeSortedByName(direction) {
    this.productNames().then((names) => {
      expect(names, 'at least two products are listed').to.have.length.greaterThan(1);

      const expected = [...names].sort((a, b) => a.localeCompare(b));
      if (direction === 'descending') expected.reverse();

      expect(names, `product names sorted ${direction}`).to.deep.equal(expected);
    });
  }

  addProductToCart(product) {
    cy.get(inventoryObjects.addToCart(product)).click();
  }

  shouldShowCartBadgeCount(count) {
    if (count === 0) {
      cy.get(inventoryObjects.cartBadge).should('not.exist');
      return;
    }
    cy.get(inventoryObjects.cartBadge).should('have.text', String(count));
  }

  openCart() {
    cy.get(inventoryObjects.cartLink).click();
  }
}

export default new InventoryPage();
