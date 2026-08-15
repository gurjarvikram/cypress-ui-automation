/// <reference types="cypress" />

import { checkoutObjects } from '../object-repository';

/** The three checkout steps: information, overview and confirmation. */
class CheckoutPage {
  // --- Step one: your information -----------------------------------------

  shouldBeOnInformationStep() {
    cy.url().should('include', '/checkout-step-one.html');
    cy.get(checkoutObjects.title).should('have.text', 'Checkout: Your Information');
  }

  fillFirstName(value) {
    cy.get(checkoutObjects.firstName).clear().type(value);
  }

  fillLastName(value) {
    cy.get(checkoutObjects.lastName).clear().type(value);
  }

  fillPostalCode(value) {
    cy.get(checkoutObjects.postalCode).clear().type(value);
  }

  fillCustomerDetails({ firstName, lastName, postalCode }) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
  }

  continue() {
    cy.get(checkoutObjects.continue).click();
  }

  shouldShowError(message) {
    cy.get(checkoutObjects.error).should('be.visible').and('contain.text', message);
  }

  // --- Step two: overview --------------------------------------------------

  shouldBeOnOverviewStep() {
    cy.url().should('include', '/checkout-step-two.html');
    cy.get(checkoutObjects.title).should('have.text', 'Checkout: Overview');
  }

  shouldShowOrderSummary(itemCount) {
    cy.get(checkoutObjects.cartItem).should('have.length', itemCount);
    cy.get(checkoutObjects.quantityLabel).should('have.text', 'QTY');
    cy.get(checkoutObjects.descriptionLabel).should('have.text', 'Description');
    cy.get(checkoutObjects.paymentLabel).should('contain.text', 'Payment Information');
    cy.get(checkoutObjects.shippingLabel).should('contain.text', 'Shipping Information');
    cy.get(checkoutObjects.totalLabel).should('contain.text', 'Price Total');
    cy.get(checkoutObjects.cancel).should('be.visible');
  }

  /** Verifies the displayed total is the item subtotal plus the stated tax. */
  shouldShowConsistentTotal() {
    const amount = (text) => Number(text.replace(/[^0-9.]/g, ''));

    cy.get(checkoutObjects.subtotal)
      .invoke('text')
      .then((subtotalText) => {
        cy.get(checkoutObjects.tax)
          .invoke('text')
          .then((taxText) => {
            cy.get(checkoutObjects.total)
              .invoke('text')
              .then((totalText) => {
                const expected = amount(subtotalText) + amount(taxText);
                expect(amount(totalText), 'total equals subtotal + tax').to.be.closeTo(
                  expected,
                  0.01,
                );
              });
          });
      });
  }

  finish() {
    cy.get(checkoutObjects.finish).click();
  }

  // --- Step three: confirmation -------------------------------------------

  shouldShowOrderConfirmation() {
    cy.url().should('include', '/checkout-complete.html');
    cy.get(checkoutObjects.title).should('have.text', 'Checkout: Complete!');
    cy.get(checkoutObjects.completeHeader).should('have.text', 'Thank you for your order!');
    cy.get(checkoutObjects.backToProducts).should('be.visible');
  }
}

export default new CheckoutPage();
