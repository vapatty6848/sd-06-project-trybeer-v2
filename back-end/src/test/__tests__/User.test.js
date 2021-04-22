const supertest = require('supertest');

const app = require('../../server');

const {
  endConnection,
  createAndInsertsDataBase,
  dropAndTruncateDataBase } = require('../actions/actionBase');

const user = {
  name: 'Bruno Silva Batista',
  email: 'bruno.batista@gmail.com',
  password: '12345678',
  role: 'client'
};

const newUser = {
  id: 3,
  name: 'Teste da Silva',
  email: 'testedasilva@teste.com',
  role: 'client',
}

const request = supertest(app);

describe('User', () => {
  beforeAll(async () => {
    await createAndInsertsDataBase();
  });

  afterAll(async () => {
    await dropAndTruncateDataBase();
    await endConnection();
  });

  it('shouldn\'t be able to register a user with email already in database', async () => {
    const { statusCode, body } = await request.post('/user')
      .send(user);
    
    expect(statusCode).toBe(409);
    expect(body.message).toBe('E-mail already in database.');
  });

  it('should be able to register a user with successful', async () => {
    const { statusCode, body } = await request.post('/user')
      .send({
        name: newUser.name,
        email: newUser.email,
        password: '123456',
        role: newUser.role,
      });

    expect(statusCode).toBe(201);
    expect(body).toStrictEqual(newUser);
  });

  it('should be able to update name of user with successful', async () => {
    const { statusCode, body } = await request.put('/user')
      .send({
        name: 'Bruno Cavalcanti',
        email: user.email,
      });

    expect(statusCode).toBe(200);
    expect(body.message).toBe('Atualização concluída com sucesso');
  });
});
