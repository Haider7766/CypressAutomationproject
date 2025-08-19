const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',   // final reports folder
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,      // show screenshots inside the report
    videoOnFailOnly: false          // record + attach video for all tests
    //  remove assetsDir — reporter automatically handles videos/screenshots
  },
  video: true,
  e2e: {
    baseUrl: 'https://ampdev.sigmaprocess.net/account/register',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
