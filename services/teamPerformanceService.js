const axios = require('axios');
const TeamPerformance = require('../models/TeamPerformance');
const logger = require('../utils/logger');

const getTeamPerformance = async (teamId, season) => {
  let performance = await TeamPerformance.findOne({ teamId, season });
  
  if (!performance) {
    const response = await axios.get(`${process.env.API_URL}/fixtures`, {
      params: {
        team: teamId,
        season,
      },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.API_KEY,
      },
    });

    const matches = response.data.response.map((match) => {
        const isHomeTeam = match.teams.home.id == teamId;
        const opponent = isHomeTeam ? match.teams.away.name : match.teams.home.name;
      
        return {
          date: match.fixture.date,
          opponent: opponent,
          result: match.goals.home > match.goals.away
            ? (isHomeTeam ? 'win' : 'loss')
            : (match.goals.home < match.goals.away ? (isHomeTeam ? 'loss' : 'win') : 'draw'),
          goalsFor: isHomeTeam ? match.goals.home : match.goals.away,
          goalsAgainst: isHomeTeam ? match.goals.away : match.goals.home,
          home: isHomeTeam,
        };
    });

    performance = new TeamPerformance({ teamId, season, matches });
    await performance.save();
  }

  return performance;
};

module.exports = {
  getTeamPerformance,
};
