/*
 * Primary file for the API
 *
 */

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./src/lib/config');
// Schemas
const User = require('./src/controllers/models/user');
// Routes
const register = require('./src/controllers/routes/register')
const login = require('./src/controllers/routes/login');
const getTask = require('./src/controllers/routes/task_get');
const newTask = require('./src/controllers/routes/task_new');
const updateTask = require('./src/controllers/routes/task_update');
const deleteTask = require('./src/controllers/routes/task_delete');

const app = express();
app.use(bodyParser.json());

// Connect to mongoose database
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useCreateIndex: true });
// Required fields:- name, email, password, timestamp
app.post('/register', (req, res) => register(req, res, User, bcrypt, jwt, config));
// Required fields:- email, password
app.post('/login', (req, res) => login(req, res, User, bcrypt, jwt, config));
// Required fields:- token, timestamp
app.get('/task', (req, res) => getTask(req, res, jwt, config, User, bcrypt));
// Required fields:- token, new task, timestamp, currentTime
app.post('/task', (req, res) => newTask(req, res, jwt, config, bcrypt, User));
// Required fields:- token, task, timestamp, update
app.put('/task', (req, res) => updateTask(req, res, jwt, config, User, bcrypt));
// Required fields:- token, task, timestamp
app.delete('/task', (req, res) => deleteTask(req, res, jwt, config, User));

app.listen(config.PORT, () => {
  console.log('Server is listening on port', config.PORT);
})

module.exports = app;
