/*
 * Test file to check all the routes
 *
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../index');
const userModel = require('../src/controllers/models/user');

chai.use(chaiHttp);

describe('app routes', () => {
  beforeEach('clear the db', (done) => {
    userModel.deleteMany({}, done);
  });
  describe('POST /register', () => {
    it('it should register an user', (done) => {
      const userData = {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: 'john123',
        timestamp: Date.now()
      };
      chai.request(server)
        .post('/register')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('email', userData.email);
          res.body.should.have.property('_id');
          done();
        })
    });
    it('it should not register an user with a missing field', (done) => {
      const userData = {
        name: 'John Doe',
        password: 'john123',
        timestamp: Date.now()
      };
      chai.request(server)
        .post('/register')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message', 'Missing required field(s)');
          done();
        })
    })  
  });
});
