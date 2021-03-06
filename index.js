/*
 * Primary file for the API
 *
 */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const JWT = require('jsonwebtoken');
const cors = require('cors');
const config = require('./src/lib/config');
const helpers = require('./src/lib/helpers');

// models
const User = require('./src/controllers/models/user');

// routes
const register = require('./src/controllers/routes/register');
const signin = require('./src/controllers/routes/signin');
const getTask = require('./src/controllers/routes/tasks_get');
const postTask = require('./src/controllers/routes/tasks_post');
const putTask = require('./src/controllers/routes/tasks_put');
const deleteTask = require('./src/controllers/routes/tasks_delete');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// connect to mongodb
mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

// required data:- name, email(unique), password, joined
app.post('/register', (req, res) => register(req, res, bcrypt, User, JWT, config));
// required data:- email, password
app.post('/signin', (req, res) => signin(req, res, User, bcrypt, JWT, config));
// required data:- token, timestamp, task
app.post('/task', (req, res) => postTask(req, res, helpers, User));
// required data:- token, timestamp
app.get('/task', (req, res) => getTask(req, res, helpers, User));
// required data:- token, timestamp, task, update
app.put('/task', (req, res) => putTask(req, res, helpers, User));
// required data:- token, timestamp, task
app.delete('/task', (req, res) => deleteTask(req, res, helpers, User));

app.listen(config.port, () => console.log(`server is listening on port ${config.port}`));

module.exports = app;
