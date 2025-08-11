




             const { defineConfig } = require('cypress');
const marge = require('mochawesome-report-generator'); 

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/json', // folder to store JSON reports
    overwrite: true,
    html: false,
    json: true
  },
  video: true,
  e2e: {
    baseUrl: 'https://ampdev.sigmaprocess.net/account/register',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // After test run – merge reports
      on('after:run', async () => {
        const { merge } = await import('mochawesome-merge'); // <-- dynamic import
        const jsonReport = await merge({ files: ['cypress/reports/json/*.json'] });
        await marge.create(jsonReport, {
          reportDir: 'cypress/reports',
          reportFilename: 'index_merged', // merged HTML file
        });
      });

      return config;
    },
  },
});
 






     














 