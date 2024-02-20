const axios = require('axios');
const logger = require('../utils/logger');

const getFixtures = async (req, res) => {
  //todo: get fixtures from mongo
  
  // try {
  //   const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
  //     params: { live: 'all' },
  //     headers: {
  //       'x-rapidapi-host': 'v3.football.api-sports.io',
  //       'x-rapidapi-key': '331c458bbf6622ce048a5e4b7e9a6fcf'
  //     }
  //   });
  //   logger.info('Successfully fetched fixtures');
  //   res.status(200).json(response.data);
  //   saveFixtures(response.data);

  // } catch (error) {
  //   logger.error('Error fetching fixtures:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
};

const Fixture = require('../models/Fixture');

const saveFixtures = (fixturesData) => {
  try {
    const fixturesArray = fixturesData.response;
     fixturesArray.forEach(fixture => {         
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
