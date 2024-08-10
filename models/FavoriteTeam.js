const mongoose = require('mongoose');

const FavoriteTeamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Number, required: true }
});

const FavoriteTeam = mongoose.model('FavoriteTeam', FavoriteTeamSchema);

module.exports = FavoriteTeam;