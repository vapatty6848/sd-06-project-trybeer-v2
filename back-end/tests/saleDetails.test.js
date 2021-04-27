const request = require('supertest');
const app = require('../app');
const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');
// const frisby = require('frisby');
// const { Joi } = frisby;

const newUser = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Testing sale details endpoint', () => {
  let session = null;
  beforeAll((done) => {
    return request(app)
      .post('/user/register')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        session = res.body.token;
        return done();
      });
  });

  afterAll((done) => {
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.users.destroy({ where: { email: 'admin.gabi.dasilva@gmail.com' } }))
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Client should not be able to access a sale that does not exist', (done) => {
    return request(app)
      .get('/sales/0')
      .set({ authorization: session })
      .expect(StatusCodes.NOT_FOUND)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Sale not found.');
        done();
      });
  });

  it('Client should not be able to access a sale of another user', (done) => {
    return request(app)
      .get('/sales/1')
      .set({ authorization: session })
      .expect(StatusCodes.FORBIDDEN)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Access denied.');
        done();
      });
  });

  it('Client should not be able to access a sale when not logged in', (done) => {
    return request(app)
      .get('/sales/2')
      .expect(StatusCodes.UNAUTHORIZED)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('token is missing');
        done();
      });
  });

  it('Client should not be able to access a sale as admin', (done) => {
    return request(app)
      .get('/admin/sales/2')
      .set({ authorization: session })
      .expect(StatusCodes.FORBIDDEN)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Access denied');
        done();
      });
  });

  it('Client should be able to access a sale they created', async (done) => {
    const schema = Joi.object({
      'id': Joi.number().required(),
      'userId': Joi.number().required(),
      'totalPrice': Joi.string().required(),
      'status': Joi.string().required(),
      'deliveryNumber': Joi.number().required(),
      'deliveryAddress': Joi.string().required(),
      'createdAt': Joi.date().required(),
      'updatedAt': Joi.date().required(),
      'products': Joi.array().items(Joi.object({
        'id': Joi.number().required(),
        'urlImage': Joi.string(),
        'name': Joi.string().required(),
        'price': Joi.string().required(),
        'sale': Joi.object({
          'quantity': Joi.number().required(),
        }).required(),
      })).required(),
    });

    await request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          address: "Rua das Pamonhas",
          number: "315"
        },
        salePrice: 27.45
      })
      .catch((err) => done(err));

    return request(app)
      .get('/sales/')
      .set({ authorization: session })
      .then((res) => {
        const saleId = res.body[0].id;

        return request(app)
          .get(`/sales/${saleId}`)
          .set({ authorization: session })
          .expect(StatusCodes.OK)
          .then((res) => {
            const { error, value } = schema.validate(res.body);
            if (error) throw new Error(error);
            return value;
          })
          .then(() => done())
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('Admin should be able to see details of any sale', async (done) => {
    const schema = Joi.object({
      'id': Joi.number().required(),
      'userId': Joi.number().required(),
      'totalPrice': Joi.string().required(),
      'status': Joi.string().required(),
      'deliveryNumber': Joi.number().required(),
      'deliveryAddress': Joi.string().required(),
      'createdAt': Joi.date().required(),
      'updatedAt': Joi.date().required(),
      'user': Joi.object({
         'name': Joi.string().required(),
        }).required(),
      'products': Joi.array().items(Joi.object({
        'id': Joi.number().required(),
        'urlImage': Joi.string(),
        'name': Joi.string().required(),
        'price': Joi.string().required(),
        'sale': Joi.object({
          'quantity': Joi.number().required(),
        }).required(),
      })).required(),
    });

    const newAdmin = {
      name: 'Admin Gabi Da Silva',
      email: 'admin.gabi.dasilva@gmail.com',
      password: '123456',
      isVendor: true,
    };

    await request(app)
      .post('/user/register')
      .send(newAdmin)
      .then((res) => {
        session = res.body.token;
      });

    return request(app)
      .get('/admin/sales/1')
      .set({ authorization: session })
      .then((res) => {
        const { error, value } = schema.validate(res.body);
        if (error) throw new Error(error);
        return value;
      })
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Admin should not be able to see details of an invalid sale param', () => {
    return request(app)
      .get('/admin/sales/string')
      .set({ authorization: session })
      .expect(StatusCodes.NOT_FOUND);
  });
});
