const { defineConfig } = require('cypress');
const marge = require('mochawesome-report-generator');
const merge = require('mochawesome-merge');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/jsons',
    overwrite: true,
    html: false, // Cypress won’t generate HTML itself
    json: true,
  },
  video: true,

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      //  Merge and generate report after test run
      on('after:run', async () => {
        const jsonDir = 'cypress/reports/jsons';
        const jsonReport = await merge({ files: [`${jsonDir}/*.json`] });
        await marge.create(jsonReport, {
          reportDir: jsonDir,
          reportFilename: 'index_merged', // You can name it 'index' if needed
        });
      });

      return config;
    },
  },
});

