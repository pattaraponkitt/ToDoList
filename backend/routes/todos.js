const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Todo = require('../models/todo');
const logger = require('../config/logger');  // Import logger


// Create Todo
router.post(
  '/',
  body('title').notEmpty().trim().escape(),
  async (req, res, next) => {
    try {
      // ...
    } catch (err) {
      logger.error(`Error while creating todo: ${err.message}`);  // Log error
      next(err);
    }
  }
);

// Get All Todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (err) {
    logger.error(`Error while getting todos: ${err.message}`);  // Log error
    next(err);
  }
});

// Get Todo By Id
router.get('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    logger.error(`Error while getting todos: ${err.message}`);  // Log error
    next(err);
  }
});

// Update Todo
router.put(
  '/:id',
  body('title').optional().trim().escape(),
  body('completed').optional().isBoolean(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updated = await Todo.update(id, req.body);
      if (updated === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({ updated });
    } catch (err) {
      logger.error(`Error while getting todos: ${err.message}`);  // Log error
      next(err);
    }
  }
);

// Delete Todo
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.delete(id);
    if (deleted === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ deleted });
  } catch (err) {
    logger.error(`Error while getting todos: ${err.message}`);  // Log error
    next(err);
  }
});

module.exports = router;