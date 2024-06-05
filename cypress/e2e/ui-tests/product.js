import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../../pageobject/loginPage";
import productPage from "../../pageobject/productPage";

Given('The user logged in and navigated to the product page', () => {
    loginPage.loginCommon()
})
When('The user should see the A to Z option', () => {
    productPage.sortingIcon()
})
When('The user selects the Z to A option', () => {
    productPage.z_To_a()
})
Then('The user should see the products sorted accordingly', () => {
    productPage.result_sorting()
})
When('The user clicks on the Add to Cart button', () => {
    productPage.add_cart_btn()
})
When('The user clicks on the cart badge', () => {
    productPage.shopping_cart_badge()
})
When('The user should see the product details on the cart page', () => {
    productPage.your_cart_details()
})
When('The user removes the product from the cart page', () => {
    productPage.remove_product_cart()
})
Then('The cart should be empty', () => {
    productPage.empty_cart()
})
When('The user clicks on the Checkout button', () => {
    
    productPage.checkout_btn()
})
When('The user navigates to the Checkout page', () => {
    productPage.navigate_To_checkout()
    
})
When('The user fills in all details', () => {
    productPage.fill_customer_details()
    
})
When('The user navigates to Checkout step two', () => {
    productPage.continue_btn()   
})
Then('The user can see the order overview on step two', () => {
    productPage.order_overview()
   
})
When('The user clicks on the Finish button', () => {
    productPage.finish_btn()
   
})
Then('The user should see the complete order', () => {
    productPage.complete_order()
   
})