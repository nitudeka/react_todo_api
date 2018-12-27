/*
 * Test file to check all the routes
 *
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');
const userModel = require('../src/controllers/models/user');

describe('app routes', () => {
  beforeEach('clear the db', (done) => {
    userModel.deleteMany({}, done);
  });
  describe('POST /register', () => {
    it('should save an user');    
  })
});
