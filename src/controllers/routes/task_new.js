module.exports = (req, res, userSchema, helpers) => {
  // set timestamp to false if it is not a number and if it is a past date (substarct one day)
  const currentTime = typeof(req.body.currentTime) === 'number' ? req.body.currentTime : false;
  const task = typeof(req.body.task) === 'string' && req.body.task.length > 0 ? req.body.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (currentTime && task && token) {
    const timestamp = typeof(req.body.timestamp) === 'number' && req.body.timestamp >= currentTime ? req.body.timestamp : false;
    if (timestamp) {
      // Vefify the token
      helpers.verifyToken(token, (err, data) => {
        if (!err && data) {
          const updatedTasks = {
            ...data.userData,
            [timestamp]: {
              ...data.userData[timestamp],
              [task]: 'In progress'
            }
          };
          userSchema.findOneAndUpdate({ email: data.email }, { tasks: updatedTasks }, { new: true }, (err, userData) => {
            if (!err && userData) {
              res.json(userData.tasks[timestamp]);
            } else {
              res.status(500).json({ message: 'Could not add the task' });
            }
          });
        } else {
          res.status(400).json({ message: 'Invalid token' });
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid date' });
    }
  } else {
    res.status(400).json({ message: 'Invalid or missing required fields' });
  };
};
