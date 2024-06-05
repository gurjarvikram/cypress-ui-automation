Feature: Product page
    Background:
        Given The user logged in and navigated to the product page

    Scenario: Verify the sorting on the product listing
        When The user should see the A to Z option
        And The user selects the Z to A option
        Then The user should see the products sorted accordingly

    Scenario: Add a product to the cart and remove it from the cart page
        When The user clicks on the Add to Cart button
        And The user clicks on the cart badge
        Then The user should see the product details on the cart page
        When The user removes the product from the cart page
        Then The cart should be empty

    Scenario: Verifying the Checkout functionality
        When The user clicks on the Add to Cart button
        And The user clicks on the cart badge
        And The user clicks on the Checkout button
        And The user navigates to the Checkout page
        And The user fills in all details
        And The user navigates to Checkout step two
        Then The user can see the order overview on step two
        And The user clicks on the Finish button
        Then The user should see the complete order



