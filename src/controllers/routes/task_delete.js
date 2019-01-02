module.exports = (req, res, jwt, config, userSchema) => {
  // Validate the required fields
  const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
  const task = typeof(req.query.task) === 'string' ? req.query.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
    // Extract the data from the JWT token
    const tokenData = jwt.verify(token, config.jwtSecret);
    if (typeof(tokenData) === 'object' && tokenData.email) {
      // Check if the token is valid
      userSchema.findOne({ email: tokenData.email }, (err, userData) => {
        if (!err && userData) {
          if (userData.tasks[timestamp] && userData.tasks[timestamp][task]) {
            // Delete the requested token from the user's object
            delete userData.tasks[timestamp][task];
            userSchema.findOneAndUpdate({ email: tokenData.email }, { tasks: userData.tasks }, { new: true }, (err, data) => {
              // Send back the tasks as a response
              res.json(data.tasks[timestamp]);
            });
          } else {
            res.status(404).json({ message: 'Task does not exist' });
          }
        } else {
          res.status(404).json({ message: 'Invalid token' });
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } else {
    res.status(400).json({ message: 'Missing or invalid required field(s)' });
  }
};
