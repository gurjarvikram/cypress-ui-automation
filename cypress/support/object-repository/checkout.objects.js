import { commonObjects } from './common.objects';

/**
 * Objects for the three checkout steps: information (`/checkout-step-one.html`),
 * overview (`/checkout-step-two.html`) and confirmation (`/checkout-complete.html`).
 */
export const checkoutObjects = Object.freeze({
  title: commonObjects.title,
  error: commonObjects.error,
  cartItem: commonObjects.inventoryItem,
  itemName: commonObjects.itemName,
  quantityLabel: commonObjects.quantityLabel,
  descriptionLabel: commonObjects.descriptionLabel,

  // Step one: your information
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continue: '[data-test="continue"]',
  cancel: '[data-test="cancel"]',

  // Step two: overview
  paymentLabel: '[data-test="payment-info-label"]',
  shippingLabel: '[data-test="shipping-info-label"]',
  totalLabel: '[data-test="total-info-label"]',
  subtotal: '[data-test="subtotal-label"]',
  tax: '[data-test="tax-label"]',
  total: '[data-test="total-label"]',
  finish: '[data-test="finish"]',

  // Step three: confirmation
  completeHeader: '[data-test="complete-header"]',
  completeText: '[data-test="complete-text"]',
  backToProducts: '[data-test="back-to-products"]',
});

export default checkoutObjects;
