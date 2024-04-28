const express = require('express');
const cors = require('cors');
const app = express();
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const logger = require('./config/logger');

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});