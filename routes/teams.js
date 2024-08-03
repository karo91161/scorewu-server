const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

router.get('/teams', teamsController.getTeams);

module.exports = router;
