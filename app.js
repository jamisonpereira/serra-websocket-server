// File: app.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { generateToken } = require('./auth'); // Import the JWT generation function

const app = express();
app.use(cors());
app.use(express.json());

// Demo credentials (replace these with a secure method in production)
const DEMO_USERNAME = process.env.DEMO_USERNAME;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;

// Endpoint to handle login and provide JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);
  console.log('Demo credentials:', DEMO_USERNAME, DEMO_PASSWORD);

  // Validate credentials
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    // Generate JWT token
    const token = generateToken({ userId: 123 });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = app;
