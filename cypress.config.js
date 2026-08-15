// Load .env before anything reads process.env, so local runs pick up
// TEST_ENV, CYPRESS_BASE_URL and CYPRESS_RECORD_KEY without exporting them by hand.
require('dotenv').config();

const { defineConfig } = require('cypress');
const { resolveEnvironment } = require('./config/resolve-environment');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

const environment = resolveEnvironment();

module.exports = defineConfig({
  // Cypress Cloud project id. Not a secret — it identifies the project, and
  // recording additionally requires CYPRESS_RECORD_KEY, which is.
  projectId: process.env.CYPRESS_PROJECT_ID || 'zyzyfz',

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
    // Resolved from config/environments.json via TEST_ENV, or overridden
    // outright by CYPRESS_BASE_URL. Never a literal in this file.
    baseUrl: environment.baseUrl,

    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',

    experimentalRunAllSpecs: true,

    async setupNodeEvents(on, config) {
      // Surface the target in the run header and in Cypress Cloud, so a run
      // recorded against the wrong environment is obvious after the fact.
      config.env.testEnvironment = environment.name;
      // eslint-disable-next-line no-console
      console.log(`Running against "${environment.name}": ${environment.baseUrl}`);

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
