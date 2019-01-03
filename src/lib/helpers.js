/*
 * Helper functions for the API
 *
 */

// Dependencies
const jwt = require('jsonwebtoken');
const config = require('./config');
const bcrypt = require('bcryptjs');
const userSchema = require('../controllers/models/user');

// Instentiate the container
const lib = {};

// Check if a token is valid
lib.verifyToken = (token) => {
  // Extract the data from the token
  let tokenData = false;
  try {
    tokenData = jwt.verify(token, config.jwtSecret);
  } catch (e) {
    return tokenData;
  };
  // Return false if the token does not contain an email and a password field
  if (tokenData.email && tokenData.password) {
    userSchema.findOne({ email: tokenData.email }, (err, data) => {
      if (!err && data) {
        const validPassword = bcrypt.compareSync(tokenData.password, data.hashedPassword);
        if (validPassword) {
          return tokenData;
        } else {
          return false;
        };
      } else {
        return false;
      };
    });
  } else {
    return false;
  }
};

// Export the module
module.exports = lib;
