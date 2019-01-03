module.exports = (req, res, userSchema, helpers) => {
  // Validate required fields
  const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
  const task = typeof(req.body.task) === 'string' ? req.body.task : false;
  const update = typeof(req.body.update) == 'string' ? req.body.update : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && update && token) {
    // Verify the token
    helpers.verifyToken(token, (err, data) => {
      if (!err && data) {
        const updatedTasks = {
          ...data.userData,
          [timestamp]: {
            ...data.userData[timestamp],
            [task]: update
          }
        };
        userSchema.findOneAndUpdate({ email: data.email }, { tasks: updatedTasks }, { new: true }, (err, userData) => {
          if (!err && userData) {
            res.json(userData.tasks[timestamp]);
          } else {
            res.status(500).json({ message: 'Could not update the task' });
          }
        })
      } else {
        res.status(400).json({ message: 'Invalid token' });
      }
    });
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
}
