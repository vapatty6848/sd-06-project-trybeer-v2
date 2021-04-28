const request = require('supertest');
const { app } = require('../app');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');

const newAdmin = {
  name: 'Gabi Dal Silv',
  email: 'admin.gabi.dalsilv@gmail.com',
  password: '123456',
  isVendor: true,
};

const newUser = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Testing admin sale edit endpoint', () => {
  let adminSession;
  let userSession;
  let saleId;

  beforeAll(async (done) => {
    await request(app)
      .post('/user/register')
      .send(newAdmin)
      .then((res) => {
        adminSession = res.body.token;
      })
      .catch((err) => done(err));

    await request(app)
      .post('/user/register')
      .send(newUser)
      .then((res) => {
        userSession = res.body.token;
      })
      .catch((err) => done(err));

    await request(app)
      .post('/sales/create')
      .set({ authorization: userSession })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          address: 'Rua das Pamonhas',
          number: '315',
        },
        salePrice: 27.45
      })
      .catch((err) => done(err));

    await request(app)
      .get('/sales/')
      .set({ authorization: userSession })
      .then((res) => {
        saleId = res.body[0].id;
      })
      .catch((err) => done(err));
    return done();
  });

  afterAll((done) => {
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.users.destroy({ where: { email: 'admin.gabi.dalsilv@gmail.com' } }))
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Admin should not be able to edit a sale that does not exist', async (done) => {
    return request(app)
      .put('/admin/sales/0')
      .set({ authorization: adminSession })
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
      .put(`/admin/sales/${saleId}`)
      .set({ authorization: adminSession })
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
      .put(`/admin/sales/${saleId}`)
      .set({ authorization: adminSession })
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
      .set({ authorization: adminSession })
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
      .put(`/admin/sales/${saleId}`)
      .set({ authorization: adminSession })
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
