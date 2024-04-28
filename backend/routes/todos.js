const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Todo = require('../models/todo');

// Create Todo
router.post(
  '/',
  body('title').notEmpty().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;
    const todoId = await Todo.create(title);
    res.status(201).json({ id: todoId });
  }
);

// Get All Todos
router.get('/', async (req, res) => {
  const todos = await Todo.getAll();
  res.json(todos);
});

// Get Todo By Id
router.get('/:id', async (req, res) => {
  const todo = await Todo.getById(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// Update Todo
router.put(
  '/:id',
  body('title').optional().trim().escape(),
  body('completed').optional().isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updated = await Todo.update(id, req.body);
    res.json({ updated });
  }
);

// Delete Todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.delete(id);
  res.json({ deleted });
});

module.exports = router;