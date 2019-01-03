module.exports = (req, res, userSchema, helpers) => {
  // Validate the required fields
  const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
  const task = typeof(req.query.task) === 'string' ? req.query.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
    // Verify the token
    helpers.verifyToken(token, (err, data) => {
      if (!err && data) {
        delete data.userData[timestamp][task];
        userSchema.findOneAndUpdate({ email: data.email }, { tasks: data.userData }, { new: true }, (err, userData) => {
          if (!err && userData) {
            res.json(userData.tasks[timestamp]);
          } else {
            res.status(500).json({ message: 'Could not delete the task' });
          }
        })
      } else {
        res.status(400).json({ message: 'Invalid token' });
      }
    });
  } else {
    res.status(400).json({ message: 'Missing or invalid required field(s)' });
  }
};
