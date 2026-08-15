@products @regression
Feature: Product catalogue and checkout
  As a signed-in shopper
  I want to sort products, manage my cart and complete a purchase
  So that I can buy the items I want

  Background:
    Given the standard user is signed in and on the product listing

  Scenario: Sorting products from A to Z
    When the user sorts products by "Name (A to Z)"
    Then the products should be listed in ascending order by name

  Scenario: Sorting products from Z to A
    When the user sorts products by "Name (Z to A)"
    Then the products should be listed in descending order by name

  Scenario: Adding and removing a product from the cart
    When the user adds the "sauce-labs-backpack" product to the cart
    Then the cart badge should show 1 item
    When the user opens the cart
    Then the cart should contain 1 product
    And the cart should list the "Sauce Labs Backpack" product
    And the cart line item details should be displayed
    When the user removes the "sauce-labs-backpack" product from the cart
    Then the cart should be empty

  @negative
  Scenario: Requiring every customer detail before continuing
    When the user adds the "sauce-labs-backpack" product to the cart
    And the user opens the cart
    And the user starts the checkout
    Then the checkout information step should be displayed
    When the user continues to the next checkout step
    Then the checkout error message should be "Error: First Name is required"
    When the user enters the customer first name
    And the user continues to the next checkout step
    Then the checkout error message should be "Error: Last Name is required"
    When the user enters the customer last name
    And the user continues to the next checkout step
    Then the checkout error message should be "Error: Postal Code is required"

  @smoke
  Scenario: Completing checkout with a single product
    When the user adds the "sauce-labs-backpack" product to the cart
    And the user opens the cart
    Then the cart should contain 1 product
    When the user starts the checkout
    And the user fills in the customer details
    And the user continues to the next checkout step
    Then the checkout overview should summarise 1 product
    And the order total should equal the subtotal plus tax
    When the user finishes the order
    Then the order confirmation should be displayed

  Scenario: Completing checkout with multiple products
    When the user adds the "sauce-labs-backpack" product to the cart
    And the user adds the "sauce-labs-bike-light" product to the cart
    Then the cart badge should show 2 items
    When the user opens the cart
    Then the cart should contain 2 products
    When the user starts the checkout
    And the user fills in the customer details
    And the user continues to the next checkout step
    Then the checkout overview should summarise 2 products
    And the order total should equal the subtotal plus tax
    When the user finishes the order
    Then the order confirmation should be displayed
