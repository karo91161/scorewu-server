// routes/prediction.js
const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');


router.get('/prediction-today', predictionController.getPredictionForTodayFixture);

module.exports = router;