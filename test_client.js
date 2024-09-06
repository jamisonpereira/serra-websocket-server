// client.js
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load the private key to sign the JWT token
const privateKey = fs.readFileSync('private.key', 'utf8'); // Replace with your private key path

// Generate a JWT token using the private key
const token = jwt.sign({ userId: 123 }, privateKey, {
  algorithm: 'RS256',
  expiresIn: '1h',
});

console.log('Generated JWT token:', token);

// Create a WebSocket client and connect to the server
const ws = new WebSocket(`wss://localhost:443?token=${token}`, {
  rejectUnauthorized: false, // Ignore self-signed certificate for testing purposes (not recommended for production)
});

ws.on('open', () => {
  console.log('Connected to the server');
  ws.send('Hello, WebSocket Server!'); // Send a test message to the server
});

ws.on('message', (message) => {
  console.log('Received from server:', message.toString()); // Decode the Buffer to a readable string
});

ws.on('close', () => {
  console.log('Disconnected from the server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
