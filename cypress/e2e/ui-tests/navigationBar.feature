Feature: Navigation Bar

    Background:
        Given The user logged in and navigated to the product page

    Scenario: Verify the data points on the left navigation bar
        When The user clicks on the toggle button
        Then The user should see data points on the navigation bar
            | All Items       |
            | About           |
            | Logout          |
            | Reset App State |

    Scenario: Logout functionality
        When The user clicks on the toggle button
        And The user clicks on the logout button
        Then The user should successfully logout
