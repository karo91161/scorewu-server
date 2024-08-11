const { getTeamPerformance } = require('../services/teamPerformanceService');

exports.getTeamPerformance = async (req, res) => {
  try {
    const { teamId, season } = req.query;
    const performance = await getTeamPerformance(teamId, season);
    res.json({ performance });
  } catch (error) {
    console.error('Error fetching team performance:', error);
    res.status(500).json({ error: 'Failed to fetch team performance' });
  }
};
