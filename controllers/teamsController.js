const { getTeamsService, getTeamByIdService } = require('../services/teamsService');
const logger = require('../utils/logger');

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

exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.query;
    const team = await getTeamByIdService(id);

    res.json({ response: team });
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
