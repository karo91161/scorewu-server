// routes/fixtures.js
const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixturesController');

router.get('/fixtures-live', fixturesController.getFixtures);

module.exports = router;
