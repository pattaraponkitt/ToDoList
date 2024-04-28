const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create Todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  const todoId = await Todo.create(title);
  res.status(201).json({ id: todoId });
});

// Get All Todos
router.get('/', async (req, res) => {
  const todos = await Todo.getAll();
  res.json(todos);
});

// Update Todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.update(id, req.body);
  res.json({ updated });
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.delete(id);
  res.json({ deleted });
});

module.exports = router;