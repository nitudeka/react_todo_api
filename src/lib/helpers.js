/*
 * Helpers for the app
 *
 */

// dependencies
const JWT = require('jsonwebtoken');
const User = require('../controllers/models/user');
const config = require('./config');

// main container to export
const lib = {};

// verify a token
lib.verifyToken = (token, callback) => {
  JWT.verify(token, config.jwtSecret, (err, decoded) => {
    if (!err && decoded) {
      User.findOne({ email: decoded.email }, (err, data) => {
        if (decoded.password === data.hashedPassword) {
          callback(false, data);
        } else {
          callback(true);
        }
      });
    } else {
      callback(true);
    }
  });
};

module.exports = lib;
