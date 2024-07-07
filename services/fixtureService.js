// services/fixtureService.js
const axios = require('axios');
const Fixture = require('../models/Fixture');
const logger = require('../utils/logger');

const getFixtures = async () => {
  try {
    const newestFixture = await Fixture.findOne().sort({ createdAt: -1 });
    if (!newestFixture || isNotTodayFixtures(newestFixture.createdAt)) {
      const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
        params: { live: 'all' },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '331c458bbf6622ce048a5e4b7e9a6fcf'
        }
      });

      await saveFixtures(response.data);

      logger.info('Successfully fetched and saved fixtures');
    } 

    logger.info('No need to fetch fixtures. Using stored fixtures.');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const storedFixtures = await Fixture.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    });

    return storedFixtures;

  } catch (error) {
    logger.error('Error fetching or saving fixtures:', error);
    return [];
  }
};

const isNotTodayFixtures = (date) => {
  const today = new Date();
  
  // Normalize the dates to the start of the day
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return date < today;
};

const saveFixtures = async (fixturesData) => {
  try {
    const fixturesArray = fixturesData.response;
    await Promise.all(fixturesArray.map(async (fixture) => {
      fixture.createdAt = new Date();
      const fixtureEntity = new Fixture(fixture);
      await fixtureEntity.save();
    }));
  } catch (error) {
    logger.error('Error saving fixtures:', error);
  }
};

module.exports = {
  getFixtures,
  saveFixtures
};
