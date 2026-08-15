/// <reference types="cypress" />

import { cartObjects } from '../object-repository';

/** Shopping cart page (`/cart.html`). */
class CartPage {
  shouldBeLoaded() {
    cy.url().should('include', '/cart.html');
    cy.get(cartObjects.title).should('have.text', 'Your Cart');
  }

  /** Asserts the cart holds exactly `count` line items. */
  shouldContainItems(count) {
    cy.get(cartObjects.cartItem).should('have.length', count);
  }

  shouldContainProduct(name) {
    cy.get(cartObjects.itemName).should('contain.text', name);
  }

  shouldShowLineItemDetails() {
    cy.get(cartObjects.quantityLabel).should('have.text', 'QTY');
    cy.get(cartObjects.descriptionLabel).should('have.text', 'Description');
    cy.get(cartObjects.itemQuantity).should('be.visible');
    cy.get(cartObjects.continueShopping).should('be.visible');
    cy.get(cartObjects.checkout).should('be.visible');
  }

  removeProduct(product) {
    cy.get(cartObjects.removeButton(product)).click();
  }

  shouldBeEmpty() {
    cy.get(cartObjects.cartItem).should('not.exist');
    cy.get(cartObjects.cartBadge).should('not.exist');
  }

  checkout() {
    cy.get(cartObjects.checkout).click();
  }
}

export default new CartPage();
