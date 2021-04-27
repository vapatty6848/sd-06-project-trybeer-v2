const request = require('supertest');
const app = require('../app');
const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');
// const frisby = require('frisby');
// const { Joi } = frisby;

const url = 'http://localhost:3001';

const newUser = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Testing sales endpoint', () => {
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
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Should not be able to create a sale without productId', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { quantity: 2 },
        ],
        delivery: {
          address: "Rua das Pamonhas",
          number: "315"
        },
        salePrice: 15.00
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid products id or quantity');
        done();
      });
  });

  it('Should not be able to create a sale without quantity', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2 },
        ],
        delivery: {
          address: "Rua das Pamonhas",
          number: "315"
        },
        salePrice: 15.00
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid products id or quantity');
        done();
      });
  });

  it('Should not be able to create a sale without address', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          number: "315"
        },
        salePrice: 15.00
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid delivery address or number');
        done();
      });
  });

  it('Should not be able to create a sale without address number', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          address: "Rua das Pamonhas"
        },
        salePrice: 15.00
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid delivery address or number');
        done();
      });
  });

  it('Should not be able to create a sale with price inconsistency', (done) => {
    return request(app)
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
        salePrice: 27.00
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Error. Price inconsistency');
        done();
      });
  });

  it('Should be able to create a sale', (done) => {
    return request(app)
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
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toEqual('Sale successfully created');
        done();
      })
      .catch((err) => done(err));
  });

  it('Should be able to get a sale by userId', (done) => {
    return request(app)
      .get('/sales/')
      .set({ authorization: session })
      .then((res) => {
        const saleId = res.body[0].id;
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
});
