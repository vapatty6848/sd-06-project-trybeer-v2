const request = require('supertest');
const Client = require('socket.io-client');
const { Server: ioServer } = require('socket.io');
const server = require('http');
const { app } = require('../app');
const models = require('../src/models/sql/models');
const { chatAdmin, chat } = require('../src/services');
const { verifyToken } = require('../src/security');
const controllers = require('../src/controllers/chat');

const http = server.createServer(app);
const io = new ioServer(http);

let clientSocket;
let adminSocket;
let clientSession;
let clientId;
let adminId;

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

      controllers.chat(io, clientSocket, token);
      controllers.user(io, clientSocket, token);
      controllers.admin(io, clientSocket, token);
    });
  });

  await request(app)
    .post('/user/register')
    .send(newClient)
    .then((res) => {
      clientSession = res.body;
      const { sub } = verifyToken(clientSession.token);
      clientId = sub;
    })
    .catch((err) => done(err));

  const CHAT_PORT = process.env.CHAT_PORT || 4001;

  clientSocket = new Client(`http://localhost:${CHAT_PORT}`, { auth: { token: clientSession } });
  clientSocket.on('connect', done);
});

describe('Tests client chat features', () => {
  it('Should be able to get stored messages at login', (done) => {
    clientSocket.on('server:storedMessages', (storedMessages) => {
      expect(storedMessages).toStrictEqual([]);
      return done();
    });
    clientSocket.emit('user:login');
  });

  it('Should be able to send messages and get them back', (done) => {
    clientSocket.on('chat:serverMessage', (msg) => {
      expect(msg.message).toBe('olah teste!');
      expect(msg.nickname).toBe(clientSession.email);
      return done();
    });
    const newMessage = { nickname: clientSession.email, message: 'olah teste!', timestamp: new Date() };
    clientSocket.emit('chat:clientMessage', { msg: newMessage, token: clientSession });
  });

  it('Should be able to use chat services for client to save message in DB', async (done) => {
    const newMessage = { nickname: clientSession.email, message: 'segundo teste! olah de novo!', timestamp: new Date() };
    const result = await chat.saveMessage(newMessage, clientSession);
    expect(result.status).toBe('SAVED');
    return done();
  });

  it('Should be able to use chat services for client to get messages from DB', async (done) => {
    const result = await chat.getMessagesByUserId(clientSession);
    expect(result.userId).toBe(clientId);
    return done();
  });
});

describe('Tests admin chat features', () => {
  let adminSession;

  const newAdmin = {
    name: 'Gabi Dal Silv',
    email: 'admin.gabi.dalsilv@gmail.com',
    password: '123456',
    isVendor: true,
  };

  beforeAll(async (done) => {
    await clientSocket.close();

    await request(app)
      .post('/user/register')
      .send(newAdmin)
      .then((res) => {
        adminSession = res.body;
        const { sub } = verifyToken(adminSession.token);
        adminId = sub;
      })
      .catch((err) => done(err));

    const CHAT_PORT = process.env.CHAT_PORT || 4001;

    adminSocket = new Client(`http://localhost:${CHAT_PORT}`, { auth: { token: adminSession } });
    adminSocket.on('connect', () => {
      return done();
    });
  });

  it('Should be able to get all stored messages at admin login', (done) => {
    adminSocket.on('admin:storedChats', (storedMessages) => {
      expect(typeof storedMessages).toBe('object');
      return done();
    });
    adminSocket.emit('admin:login');
  });

  it('Should be able to enter a client room, send messages and get them back', (done) => {
    adminSocket.on('admin:storedRoomMessages', (msgs) => {
      expect(typeof msgs).toBe('object');
      adminSocket.emit('admin:sendMessage', {
        msg: newMessage,
        client: clientSession.email,
        userId: clientId });
    });

    adminSocket.on('chat:serverMessage', (msg) => {
      expect(msg.message).toBe('admin aqui! olah!');
      expect(msg.nickname).toBe(adminSession.email);
      return done();
    });

    const newMessage = { nickname: adminSession.email, message: 'admin aqui! olah!', timestamp: new Date() };
    adminSocket.emit('admin:getRoomMessages', { client: clientSession.email, userId: clientId });
  });

  it('Should be able to get all stored messages from services as admin ', async (done) => {
    const storedChats = await chatAdmin.getChats(adminSession);
    expect(typeof storedChats).toBe('object');
    return done();
  });

  it('Should be able to use chat services for admin to save message in DB', async (done) => {
    const newMessage = { nickname: adminSession.email, message: 'admin aqui! olah!', timestamp: new Date() };
    const result = await chatAdmin.saveAdminMessage(newMessage, clientId);
    expect(result.status).toBe('SAVED');
    return done();
  });

  it('Should be able to use services for admin to get messages in DB', async (done) => {
    const getMessages = await chatAdmin.getMessagesByUserId(clientId);
    expect(getMessages.userId).toBe(clientId);
    return done();
  });
});

afterAll((done) => {
  models.users.destroy({ where: { email: 'admin.gabi.dalsilv@gmail.com' } })
    .then(() => models.users.destroy({ where: { email: 'gabi.dalsilv@gmail.com' } }))
    .then(() => models.sequelize.close())
    .then(() => chatAdmin.removeMessagesByUserId(clientId))
    .then(() => chatAdmin.removeMessagesByUserId(adminId))
    .then(() => io.close())
    .then(() => adminSocket.close())
    .then(() => http.close())
    .then(() => done());
});
