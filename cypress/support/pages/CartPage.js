/// <reference types="cypress" />

/** Shopping cart page (`/cart.html`). */
class CartPage {
  selectors = Object.freeze({
    title: '[data-test="title"]',
    cartList: '[data-test="cart-list"]',
    cartItem: '[data-test="inventory-item"]',
    itemName: '[data-test="inventory-item-name"]',
    itemQuantity: '[data-test="item-quantity"]',
    quantityLabel: '[data-test="cart-quantity-label"]',
    descriptionLabel: '[data-test="cart-desc-label"]',
    continueShopping: '[data-test="continue-shopping"]',
    checkout: '[data-test="checkout"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    removeButton: (product) => `[data-test="remove-${product}"]`,
  });

  shouldBeLoaded() {
    cy.url().should('include', '/cart.html');
    cy.get(this.selectors.title).should('have.text', 'Your Cart');
  }

  /** Asserts the cart holds exactly `count` line items. */
  shouldContainItems(count) {
    cy.get(this.selectors.cartItem).should('have.length', count);
  }

  shouldContainProduct(name) {
    cy.get(this.selectors.itemName).should('contain.text', name);
  }

  shouldShowLineItemDetails() {
    cy.get(this.selectors.quantityLabel).should('have.text', 'QTY');
    cy.get(this.selectors.descriptionLabel).should('have.text', 'Description');
    cy.get(this.selectors.itemQuantity).should('be.visible');
    cy.get(this.selectors.continueShopping).should('be.visible');
    cy.get(this.selectors.checkout).should('be.visible');
  }

  removeProduct(product) {
    cy.get(this.selectors.removeButton(product)).click();
  }

  shouldBeEmpty() {
    cy.get(this.selectors.cartItem).should('not.exist');
    cy.get(this.selectors.cartBadge).should('not.exist');
  }

  checkout() {
    cy.get(this.selectors.checkout).click();
  }
}

export default new CartPage();
