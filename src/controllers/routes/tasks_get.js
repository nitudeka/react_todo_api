module.exports = (req, res, helpers, User) => {
  // validate the required fields
	const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && token) {
    helpers.verifyToken(token, (err, data) => {
      if (!err && data) {
        res.json(data.tasks[timestamp]);
      } else {
        res.status(403).json({ message: 'Invalid token' });
      }
    });
  } else {
    res.status(400).json({ message: 'Missing required field(s)' });
  }
};
