import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pageobject/loginPage";


Given('The user navigates to the login page', () => {
  loginPage.navigate_To_Login_Page()
})

When('The user clicks on the login button', () => {
  loginPage.loginBtn()
})
When('The user enters the username {string} and password {string}', (username, password) => {
  loginPage.fillUsername(username)
  loginPage.fillPassword(password)
})

Then('The user should see an error message {string}', (expected_message) => {
  cy.contains(expected_message).should('be.visible')
})

When('The user clicks the login button without entering credentials', () => {
  loginPage.loginBtn()
})

When('The user should remain on the same URL', () => {
  cy.url().should('include', '')
})
Then('The user should see a required message', () => {
  let usermsg = 'Username is required'
  loginPage.errorMsg(usermsg)
})

When('The user enters valid username and password', () => {
  cy.fixture('users').then((users) => {
    const user = users[0];      // Get the first user
    loginPage.fillUsername(user.username)
    loginPage.fillPassword(user.password)
  })
})

Then('The user should be redirected to the product listing', () => {
  loginPage.productListing()
})