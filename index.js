/*
 * Primary file for the API
 *
 */

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./src/lib/config');
// Schemas
const User = require('./src/controllers/models/user');
const Token = require('./src/controllers/models/token');
// Routes
const register = require('./src/controllers/routes/register')

const app = express();
app.use(bodyParser.json());

// Connect to mongoose database
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useCreateIndex: true });
// Required fields:- name, email, password, timestamp
app.post('/register', (req, res) => register(req, res, User, Token, bcrypt));

app.listen(config.PORT, () => {
  console.log('Server is listening on port', config.PORT);
})

module.exports = app;
