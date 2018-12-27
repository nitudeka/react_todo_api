/*
 * File including all the config and environment variables
 *
 */

// Environments
const environments = {};

environments.development = {
  PORT: 3000,
  dbUrl: 'mongodb://localhost/todo'
};

environments.production = {
  PORT: process.env.PORT,
  dbUrl: process.env.dbUrl
};

const defaultENV = typeof(environments[process.env.NODE_ENV]) !== 'undefined' ? process.env.NODE_ENV : 'development';

const envToExport = environments[defaultENV];

module.exports = envToExport;