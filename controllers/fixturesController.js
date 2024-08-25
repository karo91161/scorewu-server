const { getLiveFixtures, getTodayFixtures, getFixtureById } = require('../services/fixtureService');

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

exports.getFixtureById = async (req, res) => {
  try {
    const fixtureId = parseInt(req.params.id, 10);
    const fixture = await getFixtureById(fixtureId);
    if (!fixture) {
      return res.status(404).json({ error: 'Fixture not found' });
    }
    res.json(fixture);
  } catch (error) {
    console.error('Error fetching fixture by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};