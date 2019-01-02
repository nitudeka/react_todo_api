module.exports = (req, res, jwt, config, bcrypt, userSchema) => {
  // set timestamp to false if it is not a number and if it is a past date (substarct one day)
  const timestamp = typeof(req.body.timestamp) === 'number' && req.body.timestamp > Date.now() - (1000 * 60 * 60 * 24) ? req.body.timestamp : false;
  const task = typeof(req.body.task) === 'string' && req.body.task.length > 0 ? req.body.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
    // Verify and extract the data from the JWT token
    const tokenData = jwt.verify(token, config.jwtSecret);
    if (typeof(tokenData) === 'object' && tokenData.email) {
      // Check if the user exists, checking the email that was extracted from the token
      userSchema.findOne({ email: tokenData.email }, (err, userData) => {
        // Continue if the token is valid
        if (!err && userData) {
          const passwordValid = bcrypt.compareSync(tokenData.password, userData.hashedPassword);
          if (passwordValid) {
            // Create an object with all the old task data and with the new task data
            const updatedTasks = {
              ...userData.tasks,
              [timestamp]: {
                ...userData.tasks[timestamp],
                [task]: 'In Progress'
              }
            };
            // Find the user who is adding a new task and populate their tasks with the new task's data
            userSchema.findOneAndUpdate({ email: userData.email }, { tasks: updatedTasks }, { new: true }, (err, data) => {
              if (!err && data) {
                // Return the tasks object if everything is ok
                res.json(data.tasks);
              } else {
                res.status(500)
              }
            });
          } else {
            res.status(403).json({ message: 'Invalid token' });
          }
        } else {
          res.status(404).json({ message: 'Inavlid token' });
        }
      })
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } else {
    res.status(400).json({ message: 'Invalid or missing required fields' });
  };
};
