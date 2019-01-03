module.exports = (req, res, jwt, config, userSchema, bcrypt) => {
  // Validate required fields
  const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
  const task = typeof(req.body.task) === 'string' ? req.body.task : false;
  const update = typeof(req.body.update) == 'string' ? req.body.update : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && update && token) {
    // Extract the data from the token
    const tokenData = jwt.verify(token, config.jwtSecret);
    if (typeof(tokenData) === 'object' && tokenData.email) {
      // Check if the user exists
      userSchema.findOne({ email: tokenData.email }, (err, userData) => {
        if (!err && userData) {
          // Check the password from the token
          const validPassword = bcrypt.compareSync(tokenData.password, userData.hashedPassword);
          if (validPassword) {
            const updatedTasks = {
              ...userData.tasks,
              [timestamp]: {
                ...userData.tasks[timestamp],
                [task]: update
              }
            };
            userSchema.findOneAndUpdate({ email: tokenData.email }, { tasks: updatedTasks }, { new: true }, (err, data) => {
              if (!err && data) {
                res.json(data.tasks[timestamp]);
              } else {
                res.status(500).json({ message: 'Could not update the task' });
              }
            })
          } else {
            res.status(403).json({ message: 'Invalid token' });
          }
        } else {
          res.status(404).json({ message: 'Invalid token' });
        }
      })
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } else {
    res.status(400).json({ message: 'Missing required fields' });
  }
}
