// overwrite the environment to test
process.env.NODE_ENV = 'test';

// test tools
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const bcrypt = require('bcrypt-nodejs');
const User = require('../src/controllers/models/user');
const server = require('../index');

chai.use(chaiHttp);

// get the token that got returned from the routes
let token;

before((done) => {
  const newUser = new User({
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('johndoe'),
    joined: Date.now()
  });
  newUser.save(done);
});

after((done) => {
  User.deleteMany({}, (done));
});

describe('API integration tests', () => {
  it('should signin an user', (done) => {
    const reqData = {
      email: 'john@gmail.com',
      password: 'john123'
    }
    chai.request(server)
      .post('/signin')
      .set({ token: 'tokenhere' })
      .send(reqData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        done(err);
      });
  });
  it('should register an user', (done) => {
    const reqData = {
      name: 'John Doe 1',
      email: 'john1@gmail.com',
      password: 'john123',
      joined: Date.now()
    };
    chai.request(server)
      .post('/register')
      .send(reqData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        done(err);
      });
  });
  it('should not signin an user without an email', (done) => {
    chai.request(server)
      .post('/signin')
      .send({ password: 'johndoe' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message', 'Missing required field(s)');
        done(err);
      });
  });
  it('should not signin an user without a password', (done) => {
    chai.request(server)
      .post('/signin')
      .send({ email: 'john@gmail.com' })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('message', 'Missing required field(s)');
        done(err);
      });
  });
});
