const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Global reporter settings (will work for both e2e and component testing)
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  
  // Global video and screenshot settings
  video: true,
  screenshotOnRunFailure: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  
  // Global viewport settings
  viewportWidth: 1280,
  viewportHeight: 720,
  
  // Global timeout settings
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  
  e2e: {
    baseUrl: 'https://ampdev.sigmaprocess.net/account/register',
    
    // E2E specific settings
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Test isolation and retry settings
    testIsolation: true,
    retries: {
      runMode: 1,    // Retry once when running in CI
      openMode: 0    // No retry when running locally
    },
    
    setupNodeEvents(on, config) {
      // Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Optional: Add task for logging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      // Optional: Handle before/after test events
      on('before:spec', (spec, results) => {
        console.log(`Running spec: ${spec.name}`);
      });
      
      on('after:spec', (spec, results) => {
        console.log(`Completed spec: ${spec.name}`);
        console.log(`Tests: ${results.stats.tests}, Passed: ${results.stats.passes}, Failed: ${results.stats.failures}`);
      });
      
      return config;
    },
  },
});