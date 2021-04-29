const request = require('supertest');
const Client = require('socket.io-client');
const server = require('http');
const { app } = require('../app');
const controllers = require('../src/controllers/chat');
const models = require('../src/models/sql/models');
const { Server } = require('socket.io');

const http = server.createServer(app);
const io = new Server(http);

let clientSocket;
let session;

const newClient = {
  name: 'Gabi Dal Silv',
  email: 'gabi.dalsilv@gmail.com',
  password: '123456',
};

beforeAll(async (done) => {
  http.listen(() => {
    const port = http.address().port;
    clientSocket = new Client(`http://localhost:${port}`);
    io.on('connection', (socket) => {
      const { token } = socket.handshake.auth;
      if (token && token.role === 'client') {
        token.roomKey = `${token.email}-room`;
        socket.join(token.roomKey);
      }

      controllers.chat(io, socket, token);
      controllers.user(io, socket, token);
      controllers.admin(io, socket, token);
    });
  });

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
  io.close();
  clientSocket.close();
  models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } })
    .then(() => models.sequelize.close())
    .then(() => done());
});

describe('Tests client chat features', () => {
  it('Should be able to get stored messages at login', (done) => {
    clientSocket.on('server:storedMessages', (storedMessages) => {
      expect(storedMessages).toStrictEqual([]);
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
    const newMessage = { nickname: session.email, message: 'olah teste!', timestamp: new Date() };
    clientSocket.emit('chat:clientMessage', { msg: newMessage, token: session });
  });
});
