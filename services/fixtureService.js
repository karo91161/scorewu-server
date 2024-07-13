// services/fixtureService.js
const axios = require('axios');
const Fixture = require('../models/Fixture');
const logger = require('../utils/logger');

const getTodayFixtures = async (page = 1, limit = 50) => {
  try {
    const newestFixture = await Fixture.findOne({ 'fixture.status.short': 'NS' }).sort({ createdAt: -1 });

    if (!newestFixture || isNotTodayFixtures(newestFixture.createdAt)) {
      const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
        params: { date: new Date().toISOString().split('T')[0] },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '331c458bbf6622ce048a5e4b7e9a6fcf'
        }
      });

      await saveFixtures(response.data);

      logger.info('Successfully fetched and saved today\'s fixtures');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const skip = (page - 1) * limit;
    const storedFixtures = await Fixture.find({
      'fixture.date': { $gte: today, $lt: tomorrow },
      'fixture.status.short': 'NS'
    }).skip(skip).limit(limit);

    const totalCount = await Fixture.countDocuments({
      'fixture.date': { $gte: today, $lt: tomorrow },
      'fixture.status.short': 'NS'
    });

    return { fixtures: storedFixtures, totalCount };

  } catch (error) {
    logger.error('Error fetching or saving today\'s fixtures:', error);
    return { fixtures: [], totalCount: 0 };
  }
};

const getLiveFixtures = async (page = 1, limit = 50) => {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const skip = (page - 1) * limit;
    const storedFixtures = await Fixture.find({
      createdAt: { $gte: today, $lt: tomorrow }
    }).skip(skip).limit(limit);

    const totalCount = await Fixture.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    return { fixtures: storedFixtures, totalCount };

  } catch (error) {
    logger.error('Error fetching or saving fixtures:', error);
    return { fixtures: [], totalCount: 0 };
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
  getLiveFixtures,
  getTodayFixtures,
  saveFixtures
};
