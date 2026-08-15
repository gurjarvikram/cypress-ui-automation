import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../pages/LoginPage';

When('the user logs in with username {string} and password {string}', (username, password) => {
  // A blank value means "leave the field untouched" — `cy.type('')` would throw.
  if (username) loginPage.fillUsername(username);
  if (password) loginPage.fillPassword(password);
  loginPage.submit();
});

When('the user submits the login form without entering credentials', () => {
  loginPage.submit();
});

When('the user logs in as the standard user', () => {
  cy.fixture('users').then(({ standard }) => {
    loginPage.fillUsername(standard.username);
    loginPage.fillPassword(standard.password);
    loginPage.submit();
  });
});

Then('the user should see the error message {string}', (message) => {
  loginPage.shouldShowError(message);
});

Then('the user should remain on the login page', () => {
  loginPage.shouldBeOnLoginPage();
});
