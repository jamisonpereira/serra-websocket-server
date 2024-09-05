const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

// Load SSL certificate and private key
const server = https.createServer({
  cert: fs.readFileSync('server.cert'),
  key: fs.readFileSync('server.key'),
});

// Create a WebSocket server using the HTTPS server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Example: Send an acknowledgment back to the client
    ws.send(`Message received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 443 (standard HTTPS port)
server.listen(443, () => {
  console.log('WebSocket server is running on wss://localhost:443');
});
