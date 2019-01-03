module.exports = (req, res, helpers) => {
  // Validate the requried filds
  const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && token) {
    // Verify if the token is valid
    helpers.verifyToken(token, timestamp, (err, data) => {
      if (!err && data) {
        res.json(data.userData);
      } else {
        res.status(400).json({ message: 'Invalid token' });
      };
    });
  } else {
    res.status(400).json({ message: 'Invalid or missing required fields' });
  };
};
