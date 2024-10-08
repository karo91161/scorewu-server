require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fixturesRoutes = require('./routes/fixtures');
const predictionRoutes = require('./routes/prediction');
const teamsRoutes = require('./routes/teams');
const favoritesRoutes = require('./routes/favoritesRoutes');
const teamPerformanceRoutes = require('./routes/teamPerformanceRoutes');
const setupCronJob = require('./cronJobs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://master--stirring-brioche-cf58dd.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

mongoose.connect('mongodb+srv://karo91161:7YM3rTvOMwu2swUx@scorewu.ujzz8.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 50000,
  socketTimeoutMS: 50000,
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
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://karo91161:7YM3rTvOMwu2swUx@scorewu.ujzz8.mongodb.net/' })
}));

app.use(authRoutes);
app.use(fixturesRoutes);
app.use(predictionRoutes);
app.use(teamsRoutes);
app.use(favoritesRoutes);
app.use(teamPerformanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
