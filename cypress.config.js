const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/jsons',  // Path for JSON and HTML reports
    overwrite: false,                      // Do not overwrite reports
    html: true,                           // Generate HTML report
    json: true,                           // Generate JSON report
    video: true,                         // Attach video info in report metadata
    screenshotOnRunFailure: true,        // Capture screenshot on failure
  },
  video: true,                            // Enable video recording in Cypress

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});

