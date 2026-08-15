@login @regression
Feature: Login
  As a Swag Labs shopper
  I want the login form to accept valid credentials and reject invalid ones
  So that only authorised users reach the product catalogue

  Background:
    Given the user is on the login page

  @negative
  Scenario Outline: Rejecting invalid credentials
    When the user logs in with username "<username>" and password "<password>"
    Then the user should see the error message "<expected_message>"
    And the user should remain on the login page

    Examples:
      | username        | password     | expected_message                                            |
      | admin           | pass123      | Username and password do not match any user in this service |
      | fake1@gmail.com | 123456       | Username and password do not match any user in this service |
      | standard_user   | admin123     | Username and password do not match any user in this service |
      | invaliduser     | secret_sauce | Username and password do not match any user in this service |

  @negative
  Scenario: Requiring a username before submitting
    When the user submits the login form without entering credentials
    Then the user should see the error message "Username is required"
    And the user should remain on the login page

  @negative
  Scenario: Requiring a password when only a username is supplied
    When the user logs in with username "standard_user" and password ""
    Then the user should see the error message "Password is required"
    And the user should remain on the login page

  @smoke
  Scenario: Signing in with valid credentials
    When the user logs in as the standard user
    Then the product listing should be displayed
