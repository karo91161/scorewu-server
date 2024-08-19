const FavoriteTeam = require('../models/FavoriteTeam');
const logger = require('../utils/logger');

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    const favorites = await FavoriteTeam.find({ userId }).select('teamId');
    res.json(favorites.map(fav => fav.teamId));
  } catch (err) {
    logger.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Failed to load favorites' });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.body.userId;
    const favorite = new FavoriteTeam({ userId, teamId });

    await favorite.save();
    res.status(201).json({ message: 'Team added to favorites' });
  } catch (err) {
    logger.error('Error adding favorite:', err);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.body.userId;
    await FavoriteTeam.deleteOne({ userId, teamId });
    res.status(200).json({ message: 'Team removed from favorites' });
  } catch (err) {
    logger.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};
