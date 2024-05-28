import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pageobject/loginPage";
import productPage from "../../pageobject/productPage";

Given('The user logged in and navigated to the product page', () => {
    loginPage.loginCommon()
})
When('The user clicks on the sorting icon', () => {
    productPage.sortingIcon()
})
When('The user selects the Z to A option', () => {
    productPage.z_To_a()
})
Then('The user should see the products sorted accordingly', () => {
    productPage.result_sorting()
})