import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import navigationMenu from '../pages/NavigationMenu';
import loginPage from '../pages/LoginPage';
import inventoryPage from '../pages/InventoryPage';

When('the user opens the side navigation menu', () => {
  navigationMenu.open();
});

When('the user clicks the logout entry', () => {
  navigationMenu.logout();
});

Then('the side navigation should show exactly these entries', (dataTable) => {
  navigationMenu.shouldShowItems(dataTable.raw().flat());
});

Then('the user should be returned to the login page', () => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  loginPage.shouldBeOnLoginPage();
});

Then('the session should be cleared', () => {
  cy.getCookie('session-username').should('not.exist');
  cy.get(inventoryPage.selectors.inventoryItem).should('not.exist');
});
