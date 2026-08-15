@navigation @regression
Feature: Side navigation menu
  As a signed-in shopper
  I want a consistent side navigation menu
  So that I can move around the store and sign out

  Background:
    Given the standard user is signed in and on the product listing

  Scenario: Listing every entry in the side navigation
    When the user opens the side navigation menu
    Then the side navigation should show exactly these entries
      | All Items       |
      | About           |
      | Logout          |
      | Reset App State |

  @smoke
  Scenario: Signing out from the side navigation
    When the user opens the side navigation menu
    And the user clicks the logout entry
    Then the user should be returned to the login page
    And the session should be cleared
