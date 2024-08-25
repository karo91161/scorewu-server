const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixturesController');


router.get('/fixtures-live', fixturesController.getLiveFixtures);
router.get('/fixtures-today', fixturesController.getTodayFixtures);
router.get('/fixtures/:id', fixturesController.getFixtureById);

module.exports = router;