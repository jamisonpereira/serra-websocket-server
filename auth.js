// File: auth.js
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

module.exports = { generateToken, verifyToken };
