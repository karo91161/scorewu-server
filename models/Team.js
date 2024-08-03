const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team: {
    id: Number,
    name: String,
    logo: String
  },
  venue: {
    id: Number,
    name: String,
    city: String
  },
  league: {
    id: Number,
    season: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
