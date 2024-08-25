const { getPredictionForTodayFixture } = require('../services/predictionService');

exports.getPredictionForTodayFixture = async (req, res) => {
    try {
      const prediction = await getPredictionForTodayFixture();
      if (prediction) {
        res.json(prediction);
      } else {
        res.status(404).json({ error: 'No prediction found for today\'s fixture' });
      }
    } catch (error) {
      console.error('Internal Server Error', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };