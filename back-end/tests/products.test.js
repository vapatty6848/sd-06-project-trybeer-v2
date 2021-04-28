const request = require('supertest');
const { app } = require('../app');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');

const newUser = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Testing products endpoint', () => {
  let session = null;
  beforeEach((done) => {
    return request(app)
      .post('/user/register')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        session = res.body.token;
        done();
      });
  });

  afterAll((done) => {
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Should be able to get a list of all products', (done) => {
    return request(app)
      .get('/products')
      .set({ authorization: session })
      .expect(StatusCodes.OK)
      .then((res) => {
        const { products } = require('./schemas')
        const { error } = products.validate(res.body);
        if (error) return done(error);
        return done();
      })
      .catch((err) => done(err));
  });
});
