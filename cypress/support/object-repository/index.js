/**
 * Object Repository — the single source of truth for element locators.
 *
 * Every selector used by the suite is defined in this folder, one file per
 * page, so a UI change is a one-line edit in a predictable place. Page objects
 * import from here; step definitions and feature files never reference a
 * selector directly.
 */
export { commonObjects } from './common.objects';
export { loginObjects } from './login.objects';
export { inventoryObjects } from './inventory.objects';
export { cartObjects } from './cart.objects';
export { checkoutObjects } from './checkout.objects';
export { navigationObjects } from './navigation.objects';
