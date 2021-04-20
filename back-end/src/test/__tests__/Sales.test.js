const supertest = require('supertest');

const app = require('../../server');

const {
  endConnection,
  createAndInsertsDataBase,
  dropAndTruncateDataBase } = require('../actions/actionBase');

const request = supertest(app);

const newSale = {
  userId: 1,
  total: '2.20',
  address: 'Teste da Rua',
  adNumber: '2',
  date: '2021-03-29 01:12:57',
  status: 'Pendente'
};

describe('Sales', () => {
  beforeAll(async () => {
    await createAndInsertsDataBase();
  });

  afterAll(async () => {
    await dropAndTruncateDataBase();
    await endConnection();
  });

  it('should be able to register a sale successful', async () => {
    const { statusCode, body } = await request.post('/sales')
      .send(newSale);

    expect(statusCode).toBe(201);
    // expect(body.message).toBe('E-mail already in database.');
  });
});
