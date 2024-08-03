const { getTeamsService } = require('../services/teamsService');

exports.getTeams = async (req, res) => {
  try {
    const { league, season } = req.query;
    const teams = await getTeamsService(league, season);
    res.json({ response: teams });
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
