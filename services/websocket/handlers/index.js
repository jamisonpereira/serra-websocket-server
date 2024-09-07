// File: websocket/handlers/index.js
const { handleResupplyRequest } = require('./handleResupplyRequest');
const { handleStatusUpdate } = require('./handleStatusUpdate');

// Main function to handle incoming WebSocket messages
const handleWebSocketMessage = (ws, message) => {
  try {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'resupplyRequest':
        handleResupplyRequest(ws, data.payload);
        break;
      case 'statusUpdate':
        handleStatusUpdate(ws, data.payload);
        break;
      // Future message types can be added here
      default:
        ws.send(JSON.stringify({ error: 'Unknown message type' }));
    }
  } catch (error) {
    console.error('Error handling WebSocket message:', error.message);
    ws.send(JSON.stringify({ error: 'Invalid message format' }));
  }
};

module.exports = { handleWebSocketMessage };
