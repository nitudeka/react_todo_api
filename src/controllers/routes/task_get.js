module.exports = (req, res, jwt, config, userSchema, bcrypt) => {
  // Validate the requried filds
  const timestamp = typeof(req.query.timestamp) ? req.query.timestamp : false;
  const token = typeof(req.headers.token) === 'string' ? req.headers.token : false;
  if (timestamp && token) {
    // Extract the data from the token
    const tokenData = jwt.verify(token, config.jwtSecret);
    if (typeof(tokenData) === 'object' && tokenData.email) {
      userSchema.findOne({ email: tokenData.email }, (err, userData) => {
        if (!err && userData) {
          const validPassword = bcrypt.compareSync(tokenData.password, userData.hashedPassword);
          if (validPassword) {
            if (userData.tasks[timestamp]) {
              res.json(userData.tasks[timestamp]);
            } else {
              // If no tasks found in the timestamp then return an empty object
              res.json({});
            }
          } else {
            res.status(403).json({ message: 'Invalid token' });
          }
        } else {
          res.status(404).json({ message: 'Invalid token' });
        }
      })
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  } else {
    res.status(400).json({ message: 'Invalid or missing required fields' });
  }
}
