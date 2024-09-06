// controllers/authController.js
require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Demo credentials (replace these with a secure method in production)
const DEMO_USERNAME = process.env.DEMO_USERNAME;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;

// Load RSA keys for JWT signing and verification
const privateKey = fs.readFileSync('private.key', 'utf8'); // Replace with your private key path
const publicKey = fs.readFileSync('public.key', 'utf8'); // Replace with your public key path
// Function to generate JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

// Function to verify JWT token
const verifyToken = (token, callback) => {
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, callback);
};

// Logic for handling user login
exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);

  // Validate credentials
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    // Generate JWT token
    const token = generateToken({ userId: 123 });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  // Logic for user registration
  res.json({ message: 'Registration successful' });
};

exports.logout = (req, res) => {
  // Logic for user logout
  res.json({ message: 'Logout successful' });
};
