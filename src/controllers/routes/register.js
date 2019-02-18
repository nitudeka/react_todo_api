module.exports = (req, res, bcrypt, User, JWT, config) => {
  // validate the request fields
  const name = typeof(req.body.name) === 'string' ? req.body.name : false;
  const email = typeof(req.body.email) === 'string' ? req.body.email : false;
  const password = typeof(req.body.password) === 'string' ? req.body.password : false;
  const joined = typeof(req.body.joined) === 'number' ? req.body.joined : false;

  if (name && email && password && joined) {
    // hash the password
    bcrypt.hash(password, null, null, (err, hash) => {
      if (!err && hash) {
        // check if the email already exists (if exists dont continue)
        User.findOne({ email }, (err, data) => {
          if (!err && !data) {
            const userData = new User({ name, email, hashedPassword: hash, joined });
            userData.save((err) => {
              if (!err) {
                /*
                * create a JWT token and send it back to the user
                *
                */
                const token = JWT.sign({ email, password: hash }, config.jwtSecret);
                res.json({ token, message: 'Registered successfully!' });
              } else {
                res.status(500).json({ message: 'Could not save the user' });
              }
            });
          } else {
            res.status(400).json({ message: 'User already exists. Please try a different email' });
          }
        });
      } else {
        res.status(500).json({ message: 'Could not hash the password' });
      }
    });
  } else {
    res.status(400).json({ message: 'Missing required field(s)' });
  }
};
