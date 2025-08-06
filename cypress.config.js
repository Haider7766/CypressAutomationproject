const { defineConfig } = require('cypress');
const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/json', // <- only json folder
    overwrite: true,
    html: false,
    json: true,
  },
  video: true,

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // Merge & generate HTML report after tests
      on('after:run', async () => {
        const jsonReport = await merge({ files: ['cypress/reports/json/*.json'] });
        await marge.create(jsonReport, {
          reportDir: 'cypress/reports/html',  // <- HTML folder
          reportFilename: 'final-report',
          inlineAssets: true,
        });
      });

      return config;
    },
  },
});
