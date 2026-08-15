import { commonObjects } from './common.objects';

/** Objects for the shopping cart page (`/cart.html`). */
export const cartObjects = Object.freeze({
  title: commonObjects.title,
  cartItem: commonObjects.inventoryItem,
  itemName: commonObjects.itemName,
  itemQuantity: commonObjects.itemQuantity,
  quantityLabel: commonObjects.quantityLabel,
  descriptionLabel: commonObjects.descriptionLabel,
  cartBadge: commonObjects.cartBadge,

  cartList: '[data-test="cart-list"]',
  continueShopping: '[data-test="continue-shopping"]',
  checkout: '[data-test="checkout"]',

  removeButton: (product) => `[data-test="remove-${product}"]`,
});

export default cartObjects;
