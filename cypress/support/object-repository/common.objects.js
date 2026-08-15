/**
 * Shared objects for chrome that appears on more than one page.
 *
 * Page-specific object files spread the entries they need, so a change to the
 * shared header or cart icon is made once here.
 */
export const commonObjects = Object.freeze({
  title: '[data-test="title"]',
  error: '[data-test="error"]',
  headerContainer: '[data-test="header-container"]',
  cartLink: '[data-test="shopping-cart-link"]',
  cartBadge: '[data-test="shopping-cart-badge"]',

  // The inventory item tile is reused verbatim on the cart and overview pages.
  inventoryItem: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemDescription: '[data-test="inventory-item-desc"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemQuantity: '[data-test="item-quantity"]',
  quantityLabel: '[data-test="cart-quantity-label"]',
  descriptionLabel: '[data-test="cart-desc-label"]',
});

export default commonObjects;
