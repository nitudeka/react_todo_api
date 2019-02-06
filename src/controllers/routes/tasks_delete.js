module.exports = (req, res, helpers, User) => {
	// validate required fields
	const timestamp = typeof(req.query.timestamp) === 'string' ? req.query.timestamp : false;
	const task = typeof(req.query.task) === 'string' ? req.query.task : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && task && token) {
  	// verify the token and extract the data from it
  	helpers.verifyToken(token, (err, data) => {
  		if (!err && data) {
  			delete data.tasks[timestamp][task];
	  		User.findOneAndUpdate({ email: data.email }, { tasks: data.tasks }, { new: true }, (err, updatedData) => {
	  			res.json(updatedData.tasks[timestamp]);
	  		});
  		} else {
  			res.status(403).json({ message: 'Invalid token' });
  		}
  	});
  } else {
  	res.status(400).json({ message: 'Missing required field(s)' });
  }
};
