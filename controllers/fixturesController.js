// controllers/fixturesController.js
const { getLiveFixtures, getTodayFixtures } = require('../services/fixtureService');

exports.getLiveFixtures = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const { fixtures, totalCount } = await getLiveFixtures(page, limit);
    res.json({ response: fixtures, totalCount });
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTodayFixtures = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const { fixtures, totalCount } = await getTodayFixtures(page, limit);
    res.json({ response: fixtures, totalCount });
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};