// File: middleware/authenticate.js
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load public key for JWT verification
const publicKey = fs.readFileSync('public.key', 'utf8'); // Replace with your public key path

// Middleware to authenticate the request using JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res
      .status(401)
      .json({ error: 'Invalid authorization header format.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
