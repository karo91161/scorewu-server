const express = require('express');
const router = express.Router();
const teamPerformanceController = require('../controllers/teamPerformanceController');

router.get('/team-performance', teamPerformanceController.getTeamPerformance);

module.exports = router;
