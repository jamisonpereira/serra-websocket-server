// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import the index file from the routes directory

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use the routes from the routes index file
app.use('/', routes);

module.exports = app;
