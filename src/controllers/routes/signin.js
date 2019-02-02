module.exports = (req, res, User, bcrypt, JWT, config) => {
	// validate the request fields
  const email = typeof(req.body.email) === 'string' ? req.body.email : false;
  const password = typeof(req.body.password) === 'string' ? req.body.password : false;
  if (email && password) {
  	User.findOne({ email }, (err, data) => {
  		if (!err && data) {
  			bcrypt.compare(password, data.hashedPassword, (error, bcryptRes) => {
  				if (!error && bcryptRes) {
  					const token = JWT.sign({ email, password: data.hashedPassword }, config.jwtSecret);
		  			res.json({ token });
  				} else {
  					res.status(403).json({ message: 'Wrong credentials' });
  				}
  			});
  		} else {
  			res.status(404).json({ message: 'User does not exist' });
  		}
  	});
  } else {
  	res.status(400).json({ message: 'Missing required field(s)' });
  }
};
