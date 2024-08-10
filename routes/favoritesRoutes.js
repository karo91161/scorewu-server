// routes/favorites.js

const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Route definitions
router.get('/favorites', favoritesController.getFavorites);
router.post('/favorites', favoritesController.addFavorite);
router.delete('/favorites', favoritesController.removeFavorite);

module.exports = router;
