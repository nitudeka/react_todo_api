/*
 * File including all the config and environment variables
 *
 */

// Environments
const environments = {};

environments.development = {
  PORT: 3000
};

environments.production = {
  PORT: process.env.PORT
};

const envToExport = typeof(process.env.NODE_ENV) === 'undefined' || typeof(environments[process.env.NODE_ENV]) === 'undefined' ? environments.development : environments.production;

module.exports = envToExport;
