Feature: Login page

  Background:
    Given The user navigates to the login page

  Scenario Outline: Logging in with different incorrect credentials
    When The user enters the username "<username>" and password "<password>"
    When The user clicks on the login button
    Then The user should see an error message "<expected_message>"

    Examples:
      | username        | password     | expected_message                                            |
      | admin           | pass123      | Username and password do not match any user in this service |
      | fake1@gmail.com | 123456       | Username and password do not match any user in this service |
      | standard_user   | admin123     | Username and password do not match any user in this service |
      | invaliduser     | secret_sauce | Username and password do not match any user in this service |

  Scenario: Verify the validation for login page
    When The user clicks the login button without entering credentials
    When The user should remain on the same URL
    Then The user should see a required message

  Scenario: Successful login with valid credentials
    When The user enters valid username and password
    When The user clicks on the login button
    Then The user should be redirected to the product listing

