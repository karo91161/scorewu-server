// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });
    
    if (!user) {
      // If user does not exist, create a new user
      user = new User({ username, password });
      await user.save();
    }
    
    // Authenticate user (whether existing or newly created)
    // You may want to add proper authentication logic here (e.g., password verification)
    
    // For simplicity, assume authentication is successful
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
