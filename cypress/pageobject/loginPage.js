
const USERNAME_INPUT = "#user-name"
const PASSWORD_INPUT = "#password"
const LOGIN_BUTTON = "#login-button"
const ERROR_MSG = '.text-red-600'


class loginPage {

    static navigate_To_Login_Page() {
        cy.visit('/')
    }

    static fillUsername(name) {
        cy.get(USERNAME_INPUT).type(name)
    }

    static fillPassword(password) {
        cy.get(PASSWORD_INPUT).type(password, { sensitive: true })
    }

    static loginBtn() {
        cy.get(LOGIN_BUTTON).click()
    }

    static errorMsg(error_msg) {
        cy.get("h3[data-test='error']").should('contain', error_msg)
    }
    
    static productListing(error_msg) {
        cy.get('.app_logo').should('contain', 'Swag Labs')
    }

    static loginCommon() {
        cy.fixture('users').then((users) => {
            const user = users[0];      // Get the first user
            cy.visit('/')
            cy.get(USERNAME_INPUT, { timeout: 15000 }).type(user.username)
            cy.get(PASSWORD_INPUT, { timeout: 15000 }).type(user.password, { sensitive: true })
            cy.get(LOGIN_BUTTON, { timeout: 15000 }).click()
        })
    }
}

export default loginPage

