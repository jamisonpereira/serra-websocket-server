// Logic for handling resupply request
exports.requestResupply = (req, res) => {
  const { latitude, longitude, timeStamp } = req.body;
  const userId = req.user.userId; // Get userId from the authenticated token

  // Validate required parameters
  if (!latitude || !longitude || !userId) {
    return res
      .status(400)
      .json({ error: 'Latitude, longitude, and userId are required.' });
  }

  // Process the resupply request (e.g., send to Ground Control Station)
  // Replace this comment with the actual logic to handle the resupply request

  console.log('Resupply request:', {
    latitude,
    longitude,
    userId,
    timeStamp,
  });

  // Respond to the client
  res
    .status(200)
    .json({ message: 'Resupply request received and processed.', userId });
};
