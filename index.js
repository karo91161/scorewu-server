require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fixturesRoutes = require('./routes/fixtures');
const predictionRoutes = require('./routes/prediction');
const teamsRoutes = require('./routes/teams');
const setupCronJob = require('./cronJobs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/scorewu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  setupCronJob();
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/scorewu' })
}));

// Routes
app.use(authRoutes);
app.use(fixturesRoutes);
app.use(predictionRoutes);
app.use(teamsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
