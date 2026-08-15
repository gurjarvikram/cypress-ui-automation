/// <reference types="cypress" />

/** Product listing page shown after a successful login. */
class InventoryPage {
  selectors = Object.freeze({
    title: '[data-test="title"]',
    sortContainer: '[data-test="product-sort-container"]',
    activeSortOption: '[data-test="active-option"]',
    inventoryItem: '[data-test="inventory-item"]',
    itemName: '[data-test="inventory-item-name"]',
    cartLink: '[data-test="shopping-cart-link"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    addToCart: (product) => `[data-test="add-to-cart-${product}"]`,
  });

  shouldBeLoaded() {
    cy.url().should('include', '/inventory.html');
    cy.get(this.selectors.title).should('have.text', 'Products');
  }

  /** Yields the visible product names, in the order the page renders them. */
  productNames() {
    return cy
      .get(this.selectors.itemName)
      .then(($names) => Cypress._.map($names, (el) => el.innerText.trim()));
  }

  selectSortOption(option) {
    cy.get(this.selectors.sortContainer).select(option);
    cy.get(this.selectors.activeSortOption).should('have.text', option);
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
    cy.get(this.selectors.addToCart(product)).click();
  }

  shouldShowCartBadgeCount(count) {
    if (count === 0) {
      cy.get(this.selectors.cartBadge).should('not.exist');
      return;
    }
    cy.get(this.selectors.cartBadge).should('have.text', String(count));
  }

  openCart() {
    cy.get(this.selectors.cartLink).click();
  }
}

export default new InventoryPage();
