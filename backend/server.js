const express = require('express');
const cors = require('cors');
const app = express();
const todoRoutes = require('./routes/todos');

app.use(cors());
app.use(express.json());


// กำหนด Routes ต่างๆ ตรงนี้
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});