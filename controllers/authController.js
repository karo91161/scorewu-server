const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../utils/logger');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({ email, password: hashedPassword });
  try {
    await user.save();
    req.session.user = { id: user._id, email: user.email };
    res.status(201).json({ message: 'User registered successfully', user: req.session.user });
  } catch (err) {
    console.error('Failed to register user', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    req.session.user = { id: user._id, email: user.email };
    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    console.error('Failed to log in', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};
