const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// User schema
const User = require('../../src/controllers/models/user')
const server = require('../../index');

chai.use(chaiHttp);

describe('POST /register', () => {
  // Clear the db before each test
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    })
  })
  it('it should save an user', (done) => {
    const user = {
      name: 'John Doe',
      email: 'john@gmail1.com',
      password: 'john1234doe',
      timestamp: Date.now()
    };
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('_id');
      })
  });
  it('it should not save an user with a missing field', () => {
    const user = {
      name: 'John Doe',
      password: 'john123',
      timestamp: Date.now()
    }
    chai.request(server)
      .post('/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a.string('Missing required field(s)');
      })
  });
})
