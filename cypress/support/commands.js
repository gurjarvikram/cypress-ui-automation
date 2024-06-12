// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// import 'cypress-plugin-api'

//import cypress = require("cypress");

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="cypress" />



// Override the type command to handle sensitive data
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false;
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

// cypress.Commands.add('login', (username, password) => {

//   cy.session([username, password], () => {
//     cy.visit('/')
//     cy.get('#user-name', { timeout: 15000 }).type(username)
//     cy.get('#password', { timeout: 15000 }).type(password, { sensitive: true })
//     cy.get('#login-button', { timeout: 15000 }).click()
//     cy.get('.title').should('contain', 'Products')

//   })

// })




