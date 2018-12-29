module.exports = (req, res, jwt, config, bcrypt, userSchema) => {
  // set timestamp to false if it is not a number and if it is a past date (substarct one day)
  const timestamp = typeof(req.body.timestamp) === 'number' && req.body.timestamp > Date.now() - (1000 * 60 * 60 * 24) ? req.body.timestamp : false;
  const task = typeof(req.body.task) === 'string' && req.body.task.length > 0 ? req.body.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
    const tokenData = jwt.verify(token, config.jwtSecret);
    userSchema.findOne({ email: tokenData.email }, (err, userData) => {
      if (!err && userData) {
        const passwordValid = bcrypt.compareSync(tokenData.password, userData.hashedPassword);
        if (passwordValid) {
          userData.tasks[timestamp] = userData.tasks[timestamp] ? userData.tasks[timestamp] : {};
          userData.tasks[timestamp][task] = 'In progress';
          userSchema.findOneAndUpdate({ email: userData.email }, { tasks: { ...userData.tasks, [timestamp]: { ...userData.tasks[timestamp], [task]: 'In Progress' } } }, { new: true }, (err, data) => {
            if (!err && data) {
              res.json(data)
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
    res.status(400).json({ message: 'Invalid or missing required fields' });
  };
};
