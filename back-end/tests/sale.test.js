const request = require('supertest');
const { app } = require('../app');
const { StatusCodes } = require('http-status-codes');
const models = require('../src/models/sql/models');

const newUser = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Testing client sales endpoint', () => {
  let session;
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

  it('Should not be able to create a sale with sale details in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: 'productId: 1, quantity: 2',
        delivery: {
          address: 'Rua das Pamonhas',
          number: '315',
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

  it('Should not be able to create a sale without product Id', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { quantity: 2 },
        ],
        delivery: {
          address: 'Rua das Pamonhas',
          number: '315',
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

  it('Should not be able to create a sale with product Id in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: '1', quantity: 2 },
        ],
        delivery: {
          address: 'Rua das Pamonhas',
          number: '315',
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
          address: 'rua N',
          number: '315',
        },
        salePrice: 15.00,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Invalid products id or quantity');
        done();
      });
  });

  it('Should not be able to create a sale with product quantity in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: '3' },
        ],
        delivery: {
          address: 'rua N',
          number: '315',
        },
        salePrice: 15.00,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body.message).toContain('Invalid products id or quantity');
        done();
      });
  });

  it('Should not be able to create a sale with address in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: 'my address 380',
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
          address: 'Rua das Pamonhas',
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

  it('Should not be able to create a sale without street address', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          number: '12',
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

  it('Should not be able to create a sale with street address in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          address: ['street'],
          number: '12',
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

  it('Should not be able to create a sale with street number in wrong format', (done) => {
    return request(app)
      .post('/sales/create')
      .set({ authorization: session })
      .send({
        sale: [
          { productId: 2, quantity: 2 },
          { productId: 3, quantity: 5 }
        ],
        delivery: {
          address: 'street',
          number: 12,
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
          number: '315',
        },
        salePrice: 7.00
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
          address: 'Rua das Pamonhas',
          number: '315',
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

  it('Should be able to get a sale by userId', async (done) => {
    const { clientSaleDetail } = require('./schemas');
    let saleId;

    await request(app)
      .get('/sales/')
      .set({ authorization: session })
      .then((res) => {
        saleId = res.body[0].id;
      })
      .catch((err) => done(err));

    return request(app)
      .get(`/sales/${saleId}`)
      .set({ authorization: session })
      .expect(StatusCodes.OK)
      .then((res) => {
        const { error } = clientSaleDetail.validate(res.body);
        if (error) return done(error);
        return done();
      })
      .catch((err) => done(err));
  });
});
