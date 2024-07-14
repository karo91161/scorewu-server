// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../utils/logger');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  logger.info('req.body', req.body)
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      // If user does not exist, return an error
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // For simplicity, assume authentication is successful
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    user = new User({ email, password: hashedPassword });
    await user.save();
    
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
