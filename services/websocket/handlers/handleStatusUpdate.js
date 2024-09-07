// File: websocket/handlers/handleStatusUpdate.js

// Function to handle 'statusUpdate' message type
const handleStatusUpdate = (ws, payload) => {
  const { status, details } = payload;
  const userId = ws.user.userId; // Retrieve userId from the authenticated WebSocket connection

  // Process the status update
  console.log(
    'Status update received from user:',
    userId,
    'Status:',
    status,
    'Details:',
    details
  );

  // Send acknowledgment back to the client
  ws.send(JSON.stringify({ message: 'Status update received', userId }));
};

module.exports = { handleStatusUpdate };
