const request = require('supertest');
const app = require('../app');
const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');
// const frisby = require('frisby');
// const { Joi } = frisby; Frisby exports Joi for convenience on type assersions

const url = 'http://localhost:3001';

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
        const schema = Joi.array().items(Joi.object({ // Assert *each* object in array
          'id': Joi.number().required(),
          'price': Joi.number().required(),
          'urlImage': Joi.string(),
          'name': Joi.string().required(),
        }));
        const { error, value } = schema.validate(res.body);
        if (error) throw new Error(error);
        return value;
      })
      .then(() => done())
      .catch((err) => done(err));
  });
});
