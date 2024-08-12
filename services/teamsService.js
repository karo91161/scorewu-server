const axios = require('axios');
const Team = require('../models/Team');
const logger = require('../utils/logger');

const getTeamsService = async (league, season) => {
    try {
        const existingTeams = await Team.find({ 'league.id': league, 'league.season': season });
        if (existingTeams.length > 0) {
            return existingTeams;
        }
  
      const response = await axios.get(`${process.env.API_URL}/teams`, {
        params: { league, season },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': process.env.API_KEY
        }
      });
  
      const teams = response.data.response;
  
      await Team.insertMany(teams.map(team => ({
        team: {
          id: team.team.id,
          name: team.team.name,
          logo: team.team.logo
        },
        venue: {
          id: team.venue.id,
          name: team.venue.name,
          city: team.venue.city
        },
        league: {
          id: league,
          season: season
        },
        createdAt: new Date()
      })));
  
      return teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  };

  const getTeamByIdService = async (id) => {
    try {
      const team = await Team.findOne({ 'team.id': id });
      return team;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  };
  
  module.exports = {
    getTeamsService,
    getTeamByIdService
  };
