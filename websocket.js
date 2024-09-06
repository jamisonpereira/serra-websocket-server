// File: websocket.js
const WebSocket = require('ws');
const { verifyToken } = require('./routes/auth'); // Import the JWT verification function

// Function to set up WebSocket server
const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  // Function to authenticate WebSocket connections
  const authenticateWebSocket = (token, ws) => {
    verifyToken(token, (err, decoded) => {
      if (err) {
        console.log('WebSocket Authentication failed:', err.message);
        ws.close();
      } else {
        console.log('WebSocket Client authenticated:', decoded);
        ws.isAuthenticated = true; // Set a custom property to indicate authentication status
      }
    });
  };

  // Handle WebSocket connections
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
      // Handle authenticated WebSocket messages here
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
};

module.exports = { setupWebSocket };
