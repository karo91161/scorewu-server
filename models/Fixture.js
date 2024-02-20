const mongoose = require('mongoose');

// Define the schema for the fixture object
const fixtureSchema = new mongoose.Schema({
    fixture: {
        id: Number,
        referee: String,
        timezone: String,
        date: Date, // Parse the date string into a Date object
        timestamp: Number,
        periods: {
            first: Number,
            second: Number
        },
        venue: {
            id: Number,
            name: String,
            city: String
        },
        status: {
            long: String,
            short: String,
            elapsed: Number
        }
    },
    league: {
        id: Number,
        name: String,
        country: String,
        logo: String,
        flag: String,
        season: Number,
        round: String
    },
    teams: {
        home: {
            id: Number,
            name: String,
            logo: String,
            winner: Boolean // Changed from String to Boolean assuming it represents the winner status
        },
        away: {
            id: Number,
            name: String,
            logo: String,
            winner: Boolean // Changed from String to Boolean assuming it represents the winner status
        }
    },
    goals: {
        home: Number,
        away: Number
    },
    score: {
        halftime: {
            home: Number,
            away: Number
        },
        fulltime: {
            home: Number,
            away: Number
        },
        extratime: {
            home: Number,
            away: Number
        },
        penalty: {
            home: Number,
            away: Number
        }
    }
});

// Create a Mongoose model based on the schema
const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
