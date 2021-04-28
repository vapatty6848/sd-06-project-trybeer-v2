const request = require('supertest');
const { app } = require('../app');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');

const url = 'http://localhost:3001';

const newAdmin = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
  isVendor: true,
};

describe('Testing admin sale edit endpoint', () => {
  let session = null;
  beforeAll((done) => {
    return request(app)
      .post('/user/register')
      .send(newAdmin)
      .then((res) => {
        session = res.body.token;
        return done();
      })
      .catch((err) => done(err));
  });

  afterAll((done) => {
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Admin should not be able to edit a sale that does not exist', async (done) => {
    await request(app)
      .post('/login')
      .send({
        email: newAdmin.email,
        password: newAdmin.password,
      })
      .then((res) => {
        session = res.body.token;
      })
      .catch((err) => done(err));

    return request(app)
      .put('/admin/sales/0')
      .set({ authorization: session })
      .send({
        delivered: 'Preparando',
      })
      .expect(StatusCodes.NOT_FOUND)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Sale not found');
        done();
      });
  });

  it('Admin should not be able to edit a sale with an invalid status', (done) => {
    return request(app)
      .put('/admin/sales/1')
      .set({ authorization: session })
      .send({
        delivered: 'AAAAA MULEQUE',
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Status is either empty or invalid');
        done();
      });
  });

  it('Admin should not be able to edit a sale with an empty status', (done) => {
    return request(app)
      .put('/admin/sales/1')
      .set({ authorization: session })
      .send({ })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Status is either empty or invalid');
        done();
      });
  });

  it('Admin should not be able to edit a sale with an empty path id', (done) => {
    return request(app)
      .put('/admin/sales/ ')
      .set({ authorization: session })
      .send({ })
      .expect(StatusCodes.NOT_FOUND)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Not Found');
        done();
      });
  });

  it('Admin should be able to edit a sale status', (done) => {
    return request(app)
      .put('/admin/sales/1')
      .set({ authorization: session })
      .send({
        delivered: 'Preparando',
      })
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.updatedTo).toEqual('Preparando');
        done();
      });
  });
});
