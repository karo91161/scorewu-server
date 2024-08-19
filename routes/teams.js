const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

router.get('/teams', teamsController.getTeams);
router.get('/team', teamsController.getTeamById);

module.exports = router;
