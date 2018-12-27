module.exports = (req, res, userSchema, bcrypt) => {
  // Validate the required fields
  const name = typeof(req.body.name) === 'string' ? req.body.name : false;
  const email = typeof(req.body.email) === 'string' ? req.body.email : false;
  const password = typeof(req.body.password) === 'string' ? req.body.password : false;
  const timestamp = typeof(req.body.timestamp) === 'number' ? req.body.timestamp : false;

  if (name && email && password && timestamp) {
    // Check if the user already exists
    userSchema.findOne({ email }, (err, data) => {
      if (!data) {
        // Hash the password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (!err && hashedPassword) {
              const userData = { name, email, hashedPassword, joined: timestamp, tasks: [] };
              const newUser = new userSchema(userData);
              newUser.save((err, user) => {
                // Do something here
              })
            } else {
              res.status(500).json({ message: 'Could not hash the password' });
            }
          })
        })
      } else {
        res.status(400).json({ message: 'User already exists' });
      }
    })
  } else {
    res.status(400).json({ message: 'Missing required field(s)' });
  }
}
