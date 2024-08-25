const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  fixtureId: {
    type: Number,
    required: true,
    unique: true
  },
  winner: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  under_over: {
    type: String,
    required: true
  },
  goals: {
    home: Number,
    away: Number
  },
  advice: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
