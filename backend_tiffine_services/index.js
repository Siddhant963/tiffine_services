const express = require('express');
const dotenv = require('dotenv');
const db = require('./Config/DbConnection');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware (express.json() is enough in newer Express versions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const adminroutes = require('./Routes/Admin');
app.use('/api/admin', adminroutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});