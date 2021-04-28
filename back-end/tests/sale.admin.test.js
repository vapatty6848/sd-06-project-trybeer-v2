const request = require('supertest');
const { app } = require('../app');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');

const newAdmin = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
  isVendor: true,
};

describe('Testing admin sales endpoint', () => {
  let session = null;
  beforeAll((done) => {
    return request(app)
      .post('/user/register')
      .send(newAdmin)
      .end((err, res) => {
        if (err) return done(err);
        session = res.body.token;
        return done();
      });
  });

  afterAll((done) => {
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Should be able to see all sales', async (done) => {
    const { adminSales } = require('./schemas');
    return request(app)
      .get('/admin/sales')
      .set({ authorization: session })
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/)
      .then((res) => {
        const { error } = adminSales.validate(res.body);
        if (error) return done(error);
        return done();
      })
      .catch((err) => done(err));
  });
});
