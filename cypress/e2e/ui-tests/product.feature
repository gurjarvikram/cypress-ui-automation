Feature: Product page
    Background:
        Given The user logged in and navigated to the product page

    Scenario: Verify the sorting on the product listing
        When The user should see the A to Z option
        And The user selects the Z to A option
        Then The user should see the products sorted accordingly

    Scenario: Add a product to the cart and remove it from the cart page
        When The user adds a single product to the cart
        And The user clicks on the cart badge
        Then The user should see the product details on the cart page
        When The user removes the product from the cart page
        Then The cart should be empty

    Scenario: Verifying validation for Checkout: Your Information
        When The user adds a single product to the cart
        And The user clicks on the cart badge
        And The user clicks on the Checkout button
        And The user navigates to the Checkout page
        And The user clicks Continue without filling in required details
        Then The user should see a required message

    Scenario: Verifying the checkout functionality with a single product
        When The user adds a single product to the cart
        And The user clicks on the cart badge
        And The user should see one product on the cart page
        And The user clicks on the Checkout button
        And The user navigates to the Checkout page
        And The user fills in all required details
        And The user proceeds to Checkout step two
        Then The user can see the order overview on step two
        And The user clicks on the Finish button
        Then The user should see the complete order confirmation

    Scenario: Verifying the checkout functionality with multiple products
        When The user has added multiple products to the cart
        And The user clicks on the cart badge
        And The user should see multiple products on the cart page
        And The user clicks on the Checkout button
        And The user navigates to the Checkout page
        And The user fills in all required details
        And The user proceeds to Checkout step two
        Then The user can see the order overview on step two
        And The user clicks on the Finish button
        Then The user should see the complete order confirmation

