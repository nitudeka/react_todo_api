module.exports = (req, res, JWT, config, User) => {
	// validate the request fields
	const task = typeof(req.body.task) === 'string' ? req.body.task : false;
	const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
	const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;

	if (task && timestamp && token) {
		const tokenData = JWT.verify(token, config.jwtSecret);
		if (tokenData.email && tokenData.password) {
			User.findOne({ email: tokenData.email }, (err, data) => {
				const update = {
					...data.tasks,
					[timestamp] : {
						...data.tasks[timestamp],
						[task]: 'In progress'
					}
				};
				User.findOneAndUpdate({ email: data.email }, { tasks: update }, { new: true }, (err, newData) => {
					res.json(newData.tasks[timestamp]);
				});
			});
		} else {
			res.status(400).json({ message: 'Invalid token' });
		}
	} else {
		res.status(400).json({ message: 'Missing required field(s)' });
	}
};
