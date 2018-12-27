module.exports = (req, res, userSchema, bcrypt, jwt, config) => {
  // Validate the required fields
  const email = typeof(req.body.email) === 'string' && req.body.email.length > 0 ? req.body.email : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.length > 0 ? req.body.password : false;
  if (email && password) {
    userSchema.findOne({ email }, (err, data) => {
      if (!err && data) {
        // Check the password
        const validPassword = bcrypt.compareSync(password, data.hashedPassword);
        if (validPassword) {
          /*
            * If the password is valid create a token and send it back to the user
          */
          // Send back a JWT token with the email and hashed password
          const token = jwt.sign({ email: email, hashedPassword: data.hashedPassword }, config.jwtSecret);
          res.json(token);
        } else {
          res.status(403).json({ message: 'Wrong credentials!' });
        }
      } else {
        res.status(404).json({ message: 'User does not exist' });
      }
    })
  } else {
    res.status(400).json({ message: 'Missing required field(s)' });
  }
}
