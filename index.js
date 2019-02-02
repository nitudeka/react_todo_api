/*
 * Primary file for the API
 *
 */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/lib/config');

// routes
const register = require('./src/controllers/routes/register');
const signin = require('./src/controllers/routes/signin');
const getTask = require('./src/controllers/routes/tasks_get');
const postTask = require('./src/controllers/routes/tasks_get');
const putTask = require('./src/controllers/routes/tasks_put');
const deleteTask = require('./src/controllers/routes/tasks_delete');

const app = express();

// connect to mongodb
mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

app.post('/register', (req, res) => register(req, res));
app.post('/signin', (req, res) => signin(req, res));
app.post('/task', (req, res) => postTask(req, res));
app.get('/task', (req, res) => getTask(req, res));
app.put('/task', (req, res) => putTask(req, res));
app.delete('/task', (req, res) => deleteTask(req, res));

app.listen(config.port, () => console.log(`server is listening on port ${config.port}`));

module.exports = app;
