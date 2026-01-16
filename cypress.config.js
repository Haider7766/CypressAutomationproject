const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    reportFilename: 'index',
    charts: true,
    inlineAssets: true,
    embeddedScreenshots: true,
    overwrite: true,
    json: true
  },

  e2e: {
    baseUrl: 'https://demo.artestri.com:8443/artestri-landing/',
    chromeWebSecurity: false,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Enable videos
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
