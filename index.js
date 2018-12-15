/*
 * Primary file for the API
 *
 */

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/lib/config');
// Routes
const register = require('./routes/register');

const app = express();
app.use(bodyParser.json());

// Required fields:- name, email, password, timestamp
app.post('/register', (req, res) => register(req, res));

app.listen(config.PORT, () => {
  console.log('Server is listening on port', config.PORT);
})

module.exports = app;
