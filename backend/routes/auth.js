const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const logger = require('../config/logger');  // Import logger



router.post(
  '/register',
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty().trim(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const userId = await User.create(username, password);
      res.status(201).json({ id: userId });
    } catch (err) {
        logger.error(`Error while registering user: ${err.message}`);  // Log error
        next(err);
    }
  }
);

router.post(
  '/login',
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty().trim(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const isValid = await User.comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
        logger.error(`Error while registering user: ${err.message}`);  // Log error
        next(err);
    }
  }
);

module.exports = router;