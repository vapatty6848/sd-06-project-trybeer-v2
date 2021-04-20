const supertest = require('supertest');

const app = require('../../server');
const { generateNewToken } = require('../../utils');

const {
  endConnection,
  createAndInsertsDataBase,
  dropAndTruncateDataBase } = require('../actions/actionBase');
const mockProducts = require('../actions/mockProducts');

const request = supertest(app);

const user = {
  name: 'Bruno Silva Batista',
  email: 'bruno.batista@gmail.com',
  password: '12345678',
  role: 'client'
};

const token = generateNewToken(user.email);

describe('Products', () => {
  beforeAll(async () => {
    await createAndInsertsDataBase();
  });

  afterAll(async () => {
    await dropAndTruncateDataBase();
    await endConnection();
  });

  it('shouldn\'t be able to get products without authorization', async () => {
    const { statusCode, body } = await request.get('/products');
    
    expect(statusCode).toBe(401);
    expect(body.message).toBe('missing auth token');
  });

  it('should be able to get all products list', async () => {
    const { statusCode, body } = await request.get('/products')
      .set('Authorization', token);
    
    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(mockProducts);
  });
});
