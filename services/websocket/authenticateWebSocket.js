// File: websocket/authenticateWebSocket.js
const { verifyToken } = require('../middleware/authenticate'); // Import the JWT verification function

// Function to authenticate WebSocket connections
const authenticateWebSocket = (token, ws) => {
  verifyToken(token, (err, decoded) => {
    if (err) {
      console.log('WebSocket Authentication failed:', err.message);
      ws.close();
    } else {
      console.log('WebSocket Client authenticated:', decoded);
      ws.isAuthenticated = true; // Set a custom property to indicate authentication status
      ws.user = decoded; // Attach user information to the WebSocket object
    }
  });
};

module.exports = { authenticateWebSocket };
