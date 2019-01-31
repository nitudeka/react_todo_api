/*
 * Config file for the app
 *
 */

// main container to export
const environments = {};

environments.development = {
  port: 3000,
  mongoUrl: 'mongodb://localhost:27017/todo'
};

environments.test = {
  port: 4000,
  mongoUrl: 'mongodb://localhost:27017/todotest'
};

environments.production = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL
};

const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check if the requested environment exists (default to development if does not exist)
const envToExport = environments[currentEnv] ? environments[currentEnv] : environments.development;

// exporte the environment that is required
module.exports = envToExport;
