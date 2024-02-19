// logger.js

const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
  level: 'info', // Set log level to 'info' (you can change it as needed)
  format: winston.format.json(), // Log in JSON format
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add colors to the console output
        winston.format.simple() // Simple format: `${level}: ${message} JSON.stringify({ ...rest })`
      )
    }),
    // Log to a file
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log file
    new winston.transports.File({ filename: 'combined.log' }) // Log all other messages to combined.log file
  ]
});

module.exports = logger;
