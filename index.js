/*
 * Primary file for the API
 *
 */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/lib/config');

const app = express();

// connect to mongodb
mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

app.listen(config.port, () => console.log(`server is listening on port ${config.port}`));

module.exports = app;
