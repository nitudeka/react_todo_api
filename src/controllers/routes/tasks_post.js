module.exports = (req, res, helpers, User) => {
	// validate the request fields
	const task = typeof(req.body.task) === 'string' ? req.body.task : false;
	const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;
	const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;

	if (task && timestamp && token) {
		helpers.verifyToken(token, (err, data) => {
			if (!err && data) {
				const update = {
					...data.tasks,
					[timestamp]: {
						...data.tasks[timestamp],
						[task]: 'in progress'
					}
				};
				User.findOneAndUpdate({ email: data.email }, { tasks: update }, { new: true }, (err, newData) => {
					res.json(newData.tasks[timestamp]);
				});
			} else {
				res.status(403).json({ message: 'Invalid token' });
			}
		})
	} else {
		res.status(400).json({ message: 'Missing required field(s)' });
	}
};
