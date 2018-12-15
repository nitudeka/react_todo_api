const chai = require('chai');
const chaiHttp = require('chai-http');
// User schema
const User = require('../src/controllers/models/user');
const server = require('../index');

chai.use(chaiHttp);

describe('POST /register', () => {
  it('it should save an user', () => {
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
        console.log(res.body);
      })
  })
})
