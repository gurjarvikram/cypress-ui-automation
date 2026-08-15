import { Before, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import inventoryPage from '../pages/InventoryPage';
import cartPage from '../pages/CartPage';
import checkoutPage from '../pages/CheckoutPage';

/**
 * Customer details are regenerated for every scenario. Generating them at
 * module scope would reuse one identity for the whole run and leak state
 * between scenarios.
 */
let customer;

Before(() => {
  customer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
});

// --- Catalogue --------------------------------------------------------------

When('the user sorts products by {string}', (option) => {
  inventoryPage.selectSortOption(option);
});

Then('the products should be listed in {word} order by name', (direction) => {
  inventoryPage.shouldBeSortedByName(direction);
});

When('the user adds the {string} product to the cart', (product) => {
  inventoryPage.addProductToCart(product);
});

Then('the cart badge should show {int} item(s)', (count) => {
  inventoryPage.shouldShowCartBadgeCount(count);
});

When('the user opens the cart', () => {
  inventoryPage.openCart();
  cartPage.shouldBeLoaded();
});

// --- Cart -------------------------------------------------------------------

Then('the cart should contain {int} product(s)', (count) => {
  cartPage.shouldContainItems(count);
});

Then('the cart should list the {string} product', (name) => {
  cartPage.shouldContainProduct(name);
});

Then('the cart line item details should be displayed', () => {
  cartPage.shouldShowLineItemDetails();
});

When('the user removes the {string} product from the cart', (product) => {
  cartPage.removeProduct(product);
});

Then('the cart should be empty', () => {
  cartPage.shouldBeEmpty();
});

// --- Checkout ---------------------------------------------------------------

When('the user starts the checkout', () => {
  cartPage.checkout();
});

Then('the checkout information step should be displayed', () => {
  checkoutPage.shouldBeOnInformationStep();
});

When('the user enters the customer first name', () => {
  checkoutPage.fillFirstName(customer.firstName);
});

When('the user enters the customer last name', () => {
  checkoutPage.fillLastName(customer.lastName);
});

When('the user fills in the customer details', () => {
  checkoutPage.fillCustomerDetails(customer);
});

When('the user continues to the next checkout step', () => {
  checkoutPage.continue();
});

Then('the checkout error message should be {string}', (message) => {
  checkoutPage.shouldShowError(message);
});

Then('the checkout overview should summarise {int} product(s)', (count) => {
  checkoutPage.shouldBeOnOverviewStep();
  checkoutPage.shouldShowOrderSummary(count);
});

Then('the order total should equal the subtotal plus tax', () => {
  checkoutPage.shouldShowConsistentTotal();
});

When('the user finishes the order', () => {
  checkoutPage.finish();
});

Then('the order confirmation should be displayed', () => {
  checkoutPage.shouldShowOrderConfirmation();
});
