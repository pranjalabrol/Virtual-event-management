const request = require('supertest');
const app = require('./server'); // Import the app instance

describe('Virtual Event Management API', () => {
  it('should register a new user', (done) => {
    request(app) // Supertest uses the app instance directly
      .post('/register')
      .send({ username: 'testuser', password: 'password' })
      .expect(201)
      .expect((res) => {
        if (!res.body.token) throw new Error('Token not returned');
      })
      .end(done);
  });

  it('should log in a user', (done) => {
    request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password' })
      .expect(200)
      .expect((res) => {
        if (!res.body.token) throw new Error('Token not returned');
      })
      .end(done);
  });
});
