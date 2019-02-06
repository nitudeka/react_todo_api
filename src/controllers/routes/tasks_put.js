module.exports = (req, res, helpers, User) => {
  // validate the required fields
  const task = typeof(req.body.task) === 'string' ? req.body.task : false;
  const update = typeof(req.body.update) === 'string' ? req.body.update : false;
	const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (task && update && timestamp && token) {
    helpers.verifyToken(token, (err, data) => {
      if (!err && data) {
        const updates = {
          ...data.tasks,
          [timestamp]: {
            ...data.tasks[timestamp],
            [task]: update
          }
        };
        User.findOneAndUpdate({ email: data.email }, { tasks: updates }, { new: true }, (err, updatedData) => {
          res.json(updatedData.tasks[timestamp]);
        })
      } else {
        res.status(403).json({ message: 'Invalid token' });
      }
    });
  } else {
    res.status(400).json({ message: 'Missing required field(s)' });
  }
};
