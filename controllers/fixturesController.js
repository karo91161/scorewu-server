const axios = require('axios');
const logger = require('../utils/logger');

const getFixtures = async () => {
  try {
    const newestFixture = await Fixture.findOne().sort({ createdAt: -1 });

    if (!newestFixture || isMoreThanOneDayOld(newestFixture.createdAt)) {
      const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
        params: { live: 'all' },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '331c458bbf6622ce048a5e4b7e9a6fcf'
        }
      });

      await saveFixtures(response.data);

      logger.info('Successfully fetched and saved fixtures');
    } else {
      // If the newest fixture is not more than one day old, return the stored fixtures
      logger.info('No need to fetch fixtures. Using stored fixtures.');
      const storedFixtures = await Fixture.find();
    }
  } catch (error) {
    logger.error('Error fetching or saving fixtures:', error);
  }
};

// Helper function to check if a fixture created date is more than one day old
const isMoreThanOneDayOld = (date) => {
  const oneDayInMs = 24 * 60 * 60 * 1000;

  return new Date() - date > oneDayInMs;
};

const Fixture = require('../models/Fixture');

const saveFixtures = (fixturesData) => {
  try {
    const fixturesArray = fixturesData.response;
     fixturesArray.forEach(fixture => {
        fixture.createdAt = new Date();
        const fixtureEntity = new Fixture(fixture);
        fixtureEntity.save();
     });
  } catch (error) {
      console.error('Error parsing or processing fixtures data:', error);
  }
};


module.exports = {
    getFixtures,
    saveFixtures
};
