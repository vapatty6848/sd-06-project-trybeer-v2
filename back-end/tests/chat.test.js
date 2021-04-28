const request = require('supertest');
const Client = require('socket.io-client');
const { io: chatServer, app } = require('../app');
const models = require('../src/models/sql/models');

const newClient = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

describe('Tests client chat features', () => {
  let clientSocket;
  let session;

  beforeAll(async (done) => {
    await request(app)
      .post('/user/register')
      .send(newClient)
      .then((res) => {
        session = res.body;
      })
      .catch((err) => done(err));

    const CHAT_PORT = process.env.CHAT_PORT || 4001;

    clientSocket = new Client(`http://localhost:${CHAT_PORT}`, { auth: { token: session } });
    clientSocket.on('connect', () => {
      return done();
    });
  });

  afterAll((done) => {
    chatServer.close();
    clientSocket.close();
    models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
      .then(() => models.sequelize.close())
      .then(() => done());
  });

  it('Should be able to get stored messages at login', (done) => {
    clientSocket.on('server:storedMessages', (arg) => {
      expect(arg).toStrictEqual([]);
      return done();
    });
    clientSocket.emit('user:login', session);
  });

  it('Should be able to send messages and get them back', (done) => {
    clientSocket.on('chat:serverMessage', (msg) => {
      expect(msg.message).toBe('olah teste!');
      expect(msg.nickname).toBe(session.email);
      return done();
    });
    const newMessage = { nickname: session.email, message: 'olah teste!', timestamp: new Date() }
    clientSocket.emit('chat:clientMessage', { msg: newMessage, token: session });
  });
});