Feature: Login page

  Background:
    Given The user navigates to the login page

  Scenario: Unsuccessful login due to incorrect password
    When The user enters a correct username
    When The user enters an incorrect password
    When The user clicks on the login button
    Then The user should see an error message indicating incorrect credentials

  Scenario: Unsuccessful login due to missing credentials
    When The user clicks the login button without entering credentials
    When The user should remain on the same URL
    Then The user should see a required message

  Scenario: Successful login with valid credentials
    When The user enters valid username and password
    When The user clicks on the login button
    Then The user should be redirected to the product listing

