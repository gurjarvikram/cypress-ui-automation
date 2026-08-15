const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  projectId: 'zyzyfz',

  // Artefacts land under cypress/reports so a single directory can be cleaned
  // and uploaded as a CI artefact.
  screenshotsFolder: 'cypress/reports/screenshots',
  videosFolder: 'cypress/reports/videos',

  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,

  // Retry only in CI runs; retries in interactive mode hide real failures.
  retries: { runMode: 2, openMode: 0 },

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,

  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    // Override per environment with CYPRESS_BASE_URL.
    baseUrl: 'https://www.saucedemo.com',

    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',

    experimentalRunAllSpecs: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] }),
      );

      // setupNodeEvents must return the config so plugin-applied changes
      // (such as the cucumber tag filter) reach the test runner.
      return config;
    },
  },
});
