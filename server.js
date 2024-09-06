// File: server.js
const https = require('https');
const http = require('http');

const fs = require('fs');
const app = require('./app'); // Import the Express app
const { setupWebSocket } = require('./websocket'); // Import the WebSocket setup function

// Load SSL certificate and private key for HTTPS
const server = https.createServer(
  {
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key'),
  },
  app // Pass the Express app to handle HTTP requests
);

// const server = http.createServer(app);

// Attach the WebSocket server to the HTTPS server
setupWebSocket(server);

// Start the server on port 443 (standard HTTPS port
server.listen(443, () => {
  console.log('Server running on https://localhost:443');
});

// Start the server on port 443 (standard HTTPS port)
// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
