/// <reference types="cypress" />

/** The three checkout steps: information, overview and confirmation. */
class CheckoutPage {
  selectors = Object.freeze({
    title: '[data-test="title"]',
    error: '[data-test="error"]',
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    cancel: '[data-test="cancel"]',
    finish: '[data-test="finish"]',
    cartItem: '[data-test="inventory-item"]',
    itemName: '[data-test="inventory-item-name"]',
    quantityLabel: '[data-test="cart-quantity-label"]',
    descriptionLabel: '[data-test="cart-desc-label"]',
    paymentLabel: '[data-test="payment-info-label"]',
    shippingLabel: '[data-test="shipping-info-label"]',
    totalLabel: '[data-test="total-info-label"]',
    subtotal: '[data-test="subtotal-label"]',
    tax: '[data-test="tax-label"]',
    total: '[data-test="total-label"]',
    completeHeader: '[data-test="complete-header"]',
    backToProducts: '[data-test="back-to-products"]',
  });

  // --- Step one: your information -----------------------------------------

  shouldBeOnInformationStep() {
    cy.url().should('include', '/checkout-step-one.html');
    cy.get(this.selectors.title).should('have.text', 'Checkout: Your Information');
  }

  fillFirstName(value) {
    cy.get(this.selectors.firstName).clear().type(value);
  }

  fillLastName(value) {
    cy.get(this.selectors.lastName).clear().type(value);
  }

  fillPostalCode(value) {
    cy.get(this.selectors.postalCode).clear().type(value);
  }

  fillCustomerDetails({ firstName, lastName, postalCode }) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
  }

  continue() {
    cy.get(this.selectors.continue).click();
  }

  shouldShowError(message) {
    cy.get(this.selectors.error).should('be.visible').and('contain.text', message);
  }

  // --- Step two: overview --------------------------------------------------

  shouldBeOnOverviewStep() {
    cy.url().should('include', '/checkout-step-two.html');
    cy.get(this.selectors.title).should('have.text', 'Checkout: Overview');
  }

  shouldShowOrderSummary(itemCount) {
    cy.get(this.selectors.cartItem).should('have.length', itemCount);
    cy.get(this.selectors.quantityLabel).should('have.text', 'QTY');
    cy.get(this.selectors.descriptionLabel).should('have.text', 'Description');
    cy.get(this.selectors.paymentLabel).should('contain.text', 'Payment Information');
    cy.get(this.selectors.shippingLabel).should('contain.text', 'Shipping Information');
    cy.get(this.selectors.totalLabel).should('contain.text', 'Price Total');
    cy.get(this.selectors.cancel).should('be.visible');
  }

  /** Verifies the displayed total is the item subtotal plus the stated tax. */
  shouldShowConsistentTotal() {
    const amount = (text) => Number(text.replace(/[^0-9.]/g, ''));

    cy.get(this.selectors.subtotal)
      .invoke('text')
      .then((subtotalText) => {
        cy.get(this.selectors.tax)
          .invoke('text')
          .then((taxText) => {
            cy.get(this.selectors.total)
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
    cy.get(this.selectors.finish).click();
  }

  // --- Step three: confirmation -------------------------------------------

  shouldShowOrderConfirmation() {
    cy.url().should('include', '/checkout-complete.html');
    cy.get(this.selectors.title).should('have.text', 'Checkout: Complete!');
    cy.get(this.selectors.completeHeader).should('have.text', 'Thank you for your order!');
    cy.get(this.selectors.backToProducts).should('be.visible');
  }
}

export default new CheckoutPage();
