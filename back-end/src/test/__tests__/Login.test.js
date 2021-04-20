const supertest = require('supertest');

const app = require('../../server');

const {
  endConnection,
  createAndInsertsDataBase,
  dropAndTruncateDataBase } = require('../actions/actionBase');

const user = {
  email: 'bruno.batista@gmail.com',
  password: '12345678',
};

const request = supertest(app);

describe('Login', () => {
  beforeAll(async () => {
    await createAndInsertsDataBase();
  });

  afterAll(async () => {
    await dropAndTruncateDataBase();
    await endConnection();
  });

  it('shouldn\'t be able to login with invalid email', async () => {
    const { statusCode, body } = await request.post('/login')
      .send({
        email: 'bruno.batista@3.com',
        password: user.password,
      });

    expect(statusCode).toBe(404);
    expect(body.message).toBe('Invalid email or password');
  });

  it('shouldn\'t be able to login with invalid password', async () => {
    const { statusCode, body } = await request.post('/login')
      .send({
        email: user.email,
        password: '12345',
      });

    expect(statusCode).toBe(404);
    expect(body.message).toBe('Invalid email or password');
  });

  it('should be able to login with successful', async () => {
    const { statusCode, body } = await request.post('/login')
      .send(user);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('token');
  });
});
