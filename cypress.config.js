const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Reporter settings
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  // Video & screenshot settings
  video: true,
  screenshotOnRunFailure: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',

  // Viewport
  viewportWidth: 1280,
  viewportHeight: 720,

  // Timeouts
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,

  e2e: {
    baseUrl: 'https://ampdev.sigmaprocess.net/account/register',

    supportFile: 'cypress/support/e2e.js', //  is file me mochawesome/register hoga
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    testIsolation: true,
    retries: {
      runMode: 1,   // Retry once in CI
      openMode: 0   // No retry locally
    },

    setupNodeEvents(on, config) {
      // Mochawesome plugin hook
      require('cypress-mochawesome-reporter/plugin')(on);

      // Custom logging tasks
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      on('before:spec', (spec) => {
        console.log(`Running spec: ${spec.name}`);
      });

      on('after:spec', (spec, results) => {
        console.log(`Completed spec: ${spec.name}`);
        console.log(
          `Tests: ${results.stats.tests}, Passed: ${results.stats.passes}, Failed: ${results.stats.failures}`
        );
      });

      return config;
    },
  },
});
