import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pageobject/loginPage";


Given('The user navigates to the login page', () => {
  loginPage.navigate_To_Login_Page()
})

When('The user clicks on the login button', () => {
  loginPage.loginBtn()
})

When('The user enters a correct username', () => {
  cy.fixture('users').then((users) => {
    const user = users[0];      // Get the first user from json file
    loginPage.fillUsername(user.username)

  })
})
When('The user enters an incorrect password', () => {
  cy.fixture('users').then((users) => {
    const user = users[1];      // Get the second user password from json file
    loginPage.fillPassword(user.password)
  })
})

Then('The user should see an error message indicating incorrect credentials', () => {
  let incorrect_cred = 'Username and password do not match any user in this service'
  loginPage.errorMsg(incorrect_cred)
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