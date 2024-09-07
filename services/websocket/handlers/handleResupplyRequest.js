// File: websocket/handlers/handleResupplyRequest.js
const resupplyController = require('../../controllers/resupplyController'); // Import the resupply controller

// Function to handle 'resupplyRequest' message type
const handleResupplyRequest = (ws, payload) => {
  const { latitude, longitude, timeStamp } = payload;
  const userId = ws.user.userId; // Retrieve userId from the authenticated WebSocket connection

  // Validate required parameters
  if (!latitude || !longitude || !userId) {
    ws.send(
      JSON.stringify({ error: 'Latitude, longitude, and userId are required.' })
    );
    return;
  }

  // Process the resupply request using the existing resupply controller logic
  resupplyController.requestResupply(
    { body: payload, user: ws.user },
    {
      status: (statusCode) => ({
        json: (response) =>
          ws.send(JSON.stringify({ statusCode, ...response })),
      }),
    }
  );

  console.log('Resupply request handled for user:', userId);
};

module.exports = { handleResupplyRequest };
