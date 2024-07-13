// routes/fixtures.js
const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixturesController');


router.get('/fixtures-live', fixturesController.getLiveFixtures);
router.get('/fixtures-today', fixturesController.getTodayFixtures);

module.exports = router;