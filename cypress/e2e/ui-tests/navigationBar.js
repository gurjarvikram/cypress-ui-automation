import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import loginPage from "../../pageobject/loginPage"
import productPage from "../../pageobject/productPage"


Given('The user logged in and navigated to the product page', () => {
    // Call the loginCommon function from loginPage object
    loginPage.loginCommon()
})

When('The user clicks on the toggle button', () => {
    // Clicks on the toggle button with id "react-burger-menu-btn"
    cy.get("#react-burger-menu-btn").click()
})
When('The user should see data points on the navigation bar', (dataTable) => {

    // Get the expected data points from the dataTable
    const expectedDataPoints = dataTable.raw().flat();


    // Get the actual data points from the navigation bar
    cy.get('.bm-item-list').each((item, index) => {
        // Asserts each item in .bm-item-list contains expected data point
        cy.wrap(item).should('contain.text', expectedDataPoints[index])
    })
})

When('The user clicks on the logout button', () => {
    // Click on the logout button
    cy.get('#logout_sidebar_link').click(); 
  });
  
  Then('The user should successfully logout', () => {
    // Verify successful logout by checking for the presence of a login button
    cy.url().should('include','https://www.saucedemo.com/')
  });