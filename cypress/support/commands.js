/// <reference types="cypress" />

/**
 * Custom commands and command overrides.
 * https://on.cypress.io/custom-commands
 */

/**
 * `cy.type(value, { sensitive: true })` masks the value in the command log and
 * in Cypress Cloud, so credentials never appear in a recorded run.
 */
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });

    return originalFn(element, text, { ...options, log: false });
  }

  return originalFn(element, text, options);
});

/**
 * Selects an element by its `data-test` attribute.
 * Prefer this over CSS/class selectors: `data-test` is a contract the
 * application owns, so restyling cannot break the suite.
 *
 * @example cy.getByTestId('login-button').click()
 */
Cypress.Commands.add('getByTestId', (testId, options) =>
  cy.get(`[data-test="${testId}"]`, options),
);
