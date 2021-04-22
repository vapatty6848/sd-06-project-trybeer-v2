const socketIO = require('socket.io');
const service = require('./src/api/conversations/service');

const URL_FRONT = process.env.FRONT_URL || 'http://localhost:3000';

const configCors = {
    cors: {
    origin: URL_FRONT,
    methods: ['GET', 'POST'],
  },
};

const chat = (http) => {
  const io = socketIO(http, configCors);

  return io.on('connection', (socket) => {
    // socket.emit('server-to-user-connection', { text: 'You are connected!', userId: 'server' });

    socket.on('user-to-server-connection', async (obj) => {
      const { userId, email } = obj;
      const conversation = await service.findOrCreate(userId, email);
      if (conversation.length) socket.emit('server-to-user-connection', conversation);
    });

    socket.on('user-to-server', async (obj) => {
      const { userId, text, email } = obj;
      await service.writeMessage({ userId, text, email });
      socket.emit('server-to-user', obj);
      io.emit('server-to-admin', 'new conversation');
    });

    socket.on('disconnect', () => console.log('Desconectado'));
  });
};

module.exports = chat;

// DO SERVER PARA O USER
// socket.emit('welcome', 'Que bom que você chegou aqui! Fica mais um cadin, vai ter bolo :)' );

// DO SERVER PARA TODOS EXCETO USER QUE ENVIOU
// socket.broadcast.emit('mensagemServer', { mensagem: ' Iiiiiirraaaa! Fulano acabou de se conectar :D'});

// DESCONEXAO
// socket.on('disconnect', () => console.log('Desconectado'));

// DO USER PARA TODOS
// socket.on('mensagem', (msg) => io.emit('mensagemServer', { mensagem: msg }));