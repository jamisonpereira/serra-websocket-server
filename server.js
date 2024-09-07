// File: server.js
const https = require('https');
const fs = require('fs');
const app = require('./app'); // Import the Express app
const { setupWebSocket } = require('./services/websocket/websocket'); // Import the WebSocket setup function

// Load SSL certificate and private key for HTTPS
const server = https.createServer(
  {
    cert: fs.readFileSync('server.cert'),
    key: fs.readFileSync('server.key'),
  },
  app // Pass the Express app to handle HTTP requests
);

// Attach the WebSocket server to the HTTPS server
setupWebSocket(server);

// Start the server on port 443 (standard HTTPS port
const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});
