'ust strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// User schema
const User = require('../models/user');
const server = require('../../../index');

// Use the chai-http middleware to make http requests
chai.use(chaiHttp);

describe('POST /register', () => {
  beforeEach((done) => {
    // Clear the DB before each test
    User.deleteMany({}, (err) => {
      done();
    });
  });
  it('it should save an user', (done) => {
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
        res.body.should.have.property('email');
        res.body.should.have.property('_id');
        done();
      })
  });
  it('it should not save an user with a missing field', (done) => {
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
        res.body.should.have.property('message');
        done();
      })
  })
});
