const WebSocket = require('ws');

// Connect to the WebSocket server
const ws = new WebSocket('wss://localhost:443', {
  rejectUnauthorized: false, // Ignore self-signed certificate for testing purposes
});

ws.on('open', () => {
  console.log('Connected to the server');

  // Send a test message to the server
  ws.send('Hello from the client!');
});

ws.on('message', (message) => {
  console.log(`Received message from server: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});
