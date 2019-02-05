module.exports = (req, res, JWT, config, User) => {
  // validate the required fields
	const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && token) {
    const tokenData = JWT.verify(token, config.jwtSecret);
    User.findOne({ email: tokenData.email }, (err, data) => {
      res.json(data.tasks[timestamp]);
    });
  } else {
    res.json('noooo!');
  }
};
