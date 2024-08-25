const cron = require('node-cron');
const fixturesController = require('./controllers/fixturesController');

const setupCronJob = () => {
  cron.schedule('0 8 * * *', async () => {
    try {
      console.log('Running cron job to fetch fixtures...');
      await fixturesController.getLiveFixtures(null, null);
      console.log('Cron job completed successfully.');
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  }, {
    timezone: 'Europe/Budapest'
  });
};

module.exports = setupCronJob;
