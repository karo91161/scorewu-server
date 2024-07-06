// controllers/fixturesController.js
const { getFixtures } = require('../services/fixtureService');

exports.getFixtures = async (req, res) => {
  try {
    const fixtures = await getFixtures();
    res.json({ response: fixtures });
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};