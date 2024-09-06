// routes/index.js
const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./auth');
const resupplyRoutes = require('./resupply');

// Use imported routes
router.use('/auth', authRoutes);
router.use('/resupply', resupplyRoutes);

module.exports = router;
