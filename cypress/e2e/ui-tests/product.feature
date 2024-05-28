Feature: Product page
    Background:
        Given The user logged in and navigated to the product page

    Scenario: Verify the sorting on the product listing
        When The user clicks on the sorting icon
        And The user selects the Z to A option
        Then The user should see the products sorted accordingly

    Scenario: Verify the data points
        When The user clicks on the sorting icon
        And The user selects the Z to A option
        Then The user should see the products sorted accordingly
