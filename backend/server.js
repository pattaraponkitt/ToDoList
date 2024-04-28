const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const todoRoutes = require('./routes/todos');

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// SSL/TLS Configuration
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

const PORT = process.env.PORT || 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});