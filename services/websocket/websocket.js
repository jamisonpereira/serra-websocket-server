// File: services/websocket.js
const WebSocket = require('ws');
const { authenticateWebSocket } = require('authenticateWebSocket'); // Import WebSocket authentication function
const { handleWebSocketMessage } = require('./handlers/'); // Import message handler

// Function to set up WebSocket server
const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    console.log('Client attempting to connect via WebSocket');

    // Extract token from URL query parameters (e.g., wss://your-server?token=...)
    const token = new URL(
      req.url,
      `https://${req.headers.host}`
    ).searchParams.get('token');

    // Authenticate WebSocket connection
    authenticateWebSocket(token, ws);

    ws.on('message', (message) => {
      if (!ws.isAuthenticated) {
        console.log('Unauthorized message received:', message);
        ws.close();
        return;
      }

      console.log(`Received message: ${message}`);

      // Handle authenticated WebSocket messages
      handleWebSocketMessage(ws, message);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
};

module.exports = { setupWebSocket };
