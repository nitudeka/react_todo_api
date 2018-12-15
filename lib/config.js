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

const envToExport = process.env.NODE_ENV = 'production' ? environments.production : environments.development;

module.exports = envToExport;
