// Loaded automatically before every spec file.
// https://on.cypress.io/configuration

import './commands';

/**
 * Fail the test when the application under test throws.
 *
 * Swallowing every uncaught exception (`return false` unconditionally) hides
 * real application defects, which is exactly what these tests exist to catch.
 * Add a narrowly-scoped exception here if a known third-party error needs to
 * be tolerated, and say why.
 */
Cypress.on('uncaught:exception', (err) => {
  // ResizeObserver noise is a benign browser warning, not an app failure.
  if (/ResizeObserver loop/.test(err.message)) {
    return false;
  }
  return true;
});
