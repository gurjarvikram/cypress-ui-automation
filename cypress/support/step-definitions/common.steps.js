import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';

/**
 * Shared steps used by more than one feature.
 *
 * Every step definition file is loaded for every feature (see
 * `.cypress-cucumber-preprocessorrc.json`), so a step defined here must not be
 * redefined elsewhere — the preprocessor fails the run on ambiguous steps.
 */

Given('the user is on the login page', () => {
  loginPage.visit();
});

Given('the standard user is signed in and on the product listing', () => {
  loginPage.loginAsUser('standard');
  inventoryPage.shouldBeLoaded();
});

Then('the product listing should be displayed', () => {
  inventoryPage.shouldBeLoaded();
});
