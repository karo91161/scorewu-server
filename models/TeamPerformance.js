const mongoose = require('mongoose');

const TeamPerformanceSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
    unique: true,
  },
  season: {
    type: Number,
    required: true,
  },
  matches: [
    {
      date: Date,
      opponent: String,
      result: String,
      goalsFor: Number,
      goalsAgainst: Number,
      home: Boolean,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TeamPerformance', TeamPerformanceSchema);
