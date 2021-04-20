const frisby = require('frisby');
const { StatusCodes } = require('http-status-codes');

const connection = require('../src/models/connection');
const { generateToken } = require('../src/security');
const url = 'http://localhost:3001';

const clientUser = {
  email: 'user@test.com',
  password: 'test123',
  userId: 2,
  isVendor: true,
};

describe('Testing products endpoint', () => {
  beforeAll(() => {
    frisby.globalSetup({
      request: {
        headers: {
          Authorization: generateToken(clientUser.userId, clientUser.isVendor),
          'Content-Type': 'application/json',
        },
      },
    });
    connection.end();
  });

  it('Should be able to get a list of all products', async () => {
    await frisby
        .get(`${url}/products`)
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const arrayResult = result.map((elem) => elem.name);
        expect(arrayResult.length).toBeGreaterThanOrEqual(1);
      });
  });
});
