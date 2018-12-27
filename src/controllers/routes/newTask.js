module.exports = (req, res, tokenSchema, userSchema) => {
  // set timestamp to false if it is not a number and if it is a past date (substarct one day)
  const timestamp = typeof(req.body.timestamp) === 'number' && req.body.timestamp > Date.now() - (1000 * 60 * 60 * 24) ? req.body.timestamp : false;
  const task = typeof(req.body.task) === 'string' && req.body.task.length > 0 ? req.body.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
    tokenSchema.findById(token, (err, tokenData) => {
      if (!err && tokenData) {
        // Do something here
      } else {
        res.status(403).json({ message: 'Token does not exist' });
      };
    });
  } else {
    res.status(400).json({ message: 'Invalid or missing required fields' });
  };
};
