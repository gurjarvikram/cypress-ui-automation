const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

  module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',  // Set your base URL here
    

    env:{
      requestMode: true,
    },
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      
      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      screenshotOnRunFailure=true;	    
      return config;
    },
    projectId: 'zyzyfz',
    specPattern: 'cypress/e2e/*/*.feature',
    viewportWidth: 1880,
    viewportHeight: 882,   
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalRunAllSpecs: true,
    "chromeWebSecurity" : false
    
  },
  
});