/*
 * Config file for the app
 *
 */

// main container to export
const environments = {};

environments.development = {
  port: 3000
};

environments.test = {
  port: 4000
};

environments.production = {
  port: process.env.PORT
};

const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check if the requested environment exists (default to development if does not exist)
const envToExport = environments[currentEnv] ? environments[currentEnv] : environments.production;

// exporte the environment that is required
module.exports = envToExport;
