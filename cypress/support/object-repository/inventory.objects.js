import { commonObjects } from './common.objects';

/** Objects for the product listing page (`/inventory.html`). */
export const inventoryObjects = Object.freeze({
  title: commonObjects.title,
  inventoryItem: commonObjects.inventoryItem,
  itemName: commonObjects.itemName,
  itemPrice: commonObjects.itemPrice,
  cartLink: commonObjects.cartLink,
  cartBadge: commonObjects.cartBadge,

  sortContainer: '[data-test="product-sort-container"]',
  activeSortOption: '[data-test="active-option"]',

  // Parameterised locator: the product id is part of the attribute value,
  // e.g. addToCart('sauce-labs-backpack').
  addToCart: (product) => `[data-test="add-to-cart-${product}"]`,
  removeFromCart: (product) => `[data-test="remove-${product}"]`,
});

export default inventoryObjects;
