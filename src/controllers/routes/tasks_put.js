module.exports = (req, res, JWT, config, User) => {
  // validate the required fields
  const task = typeof(req.body.task) === 'string' ? req.body.task : false;
  const update = typeof(req.body.update) === 'string' ? req.body.update : false;
	const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (task && update && timestamp && token) {
    const tokenData = JWT.verify(token, config.jwtSecret);
    User.findOne({ email: tokenData.email }, (err, data) => {
      const updates = {
        ...data.tasks,
        [timestamp]: {
          ...data.tasks[timestamp],
          [task]: update
        }
      };
      User.findOneAndUpdate({ email: tokenData.email }, { tasks: updates }, { new: true }, (err, updatedData) => {
        res.json(updatedData.tasks[timestamp]);
      })
    });
  } else {
    res.json('noo!!');
  }
};
