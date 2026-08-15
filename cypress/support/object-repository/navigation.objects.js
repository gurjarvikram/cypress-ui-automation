/**
 * Objects for the burger-menu side navigation, available on every
 * authenticated page.
 *
 * The open/close controls come from a third-party menu component that exposes
 * no `data-test` attribute, so its own ids and classes are used instead. These
 * are the exceptions to the data-test rule and are marked as such.
 */
export const navigationObjects = Object.freeze({
  // Third-party (react-burger-menu) — no data-test hook available.
  openButton: '#react-burger-menu-btn',
  closeButton: '#react-burger-cross-btn',
  menu: '.bm-menu-wrap',
  items: '.bm-item-list a',

  allItems: '[data-test="inventory-sidebar-link"]',
  about: '[data-test="about-sidebar-link"]',
  logout: '[data-test="logout-sidebar-link"]',
  resetAppState: '[data-test="reset-sidebar-link"]',
});

export default navigationObjects;
