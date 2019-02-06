/*
 * Helpers for the app
 *
 */

// dependencies
const JWT = require('jsonwebtoken');
const config = require('./config');

// main container to export
const lib = {};

// verify a token
lib.verifyToken = (token, callback) => {
  JWT.verify(token, config.jwtSecret, (err, decoded) => {
    if (!err && decoded) {
      callback(false, decoded)
    } else {
      callback(true);
    }
  });
};

module.exports = lib;
