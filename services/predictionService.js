// services/fixtureService.js
const axios = require('axios');
const Prediction = require('../models/Prediction');
const logger = require('../utils/logger');
const { getTodayFixtures } = require('./fixtureService');

const getPredictions = async (fixtureId) => {
    try {
      const response = await axios.get(`https://v3.football.api-sports.io/predictions`, {
        params: { fixture: fixtureId },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': '331c458bbf6622ce048a5e4b7e9a6fcf'
        }
      });
  
      return response.data.response[0];
    } catch (error) {
      logger.error('Error fetching predictions:', error);
      return null;
    }
};

const savePrediction = async (predictionData, fixture) => {
  try {
    const confidenceString = predictionData.comparison?.total?.away || '0%';
    const confidenceNumber = parseFloat(confidenceString.replace('%', ''));

    const winnerName = predictionData.predictions?.winner?.name || 'unknown';
    const underOver = predictionData.predictions?.under_over || '+1'; // Set default value to '+1'
    const goalsHome = predictionData.predictions?.goals?.home;
    const goalsAway = predictionData.predictions?.goals?.away;
    const advice = predictionData.predictions?.advice || 'No advice';

    const prediction = new Prediction({
      fixtureId: fixture.id,
      winner: winnerName,
      confidence: confidenceNumber,
      under_over: underOver,
      goals: {
        home: goalsHome ? parseFloat(goalsHome.replace('%', '')) : 0,
        away: goalsAway ? parseFloat(goalsAway.replace('%', '')) : 0
      },
      advice: advice
    });

    await prediction.save();
    console.log('Prediction saved successfully');
  } catch (error) {
    console.error('Error saving prediction:', error);
  }
};

const getPredictionForTodayFixture = async () => {
    try {
      // Get today's fixtures
      const todayFixturesResult = await getTodayFixtures(1, 1);
      const fixture = todayFixturesResult.fixtures.find(fixture => fixture.fixture.status.short === 'NS');
  
      if (!fixture) {
        return null;
      }
  
      // Check if prediction already exists for this fixture
      const existingPrediction = await Prediction.findOne({ fixtureId: fixture.fixture.id });
      if (existingPrediction) {
        return existingPrediction;
      }
  
      // Get prediction from API
      const predictionData = await getPredictions(fixture.fixture.id);

      if (!predictionData) {
        return null;
      }
      // Save prediction to DB
      const savedPrediction = await savePrediction(predictionData, fixture.fixture);
      return savedPrediction;
  
    } catch (error) {
      logger.error('Error getting prediction for today fixture:', error);
      return null;
    }
};

module.exports = {
    getPredictions,
    getPredictionForTodayFixture,
    savePrediction
 };
