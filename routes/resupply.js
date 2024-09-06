// routes/resupply.js
const express = require('express');
const router = express.Router();
const resupplyController = require('../controllers/resupplyController');
const authenticateToken = require('../middleware/authenticate'); // Import the middleware

// Protect the route with the authentication middleware
router.post('/request', authenticateToken, resupplyController.requestResupply);

module.exports = router;
