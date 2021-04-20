const socketIO = require('socket.io');

const URL_FRONT = process.env.FRONT_URL || 'http://localhost:3000';
const chat = (http) => {
  const io = socketIO(http, {
    cors: {
      origin: URL_FRONT, // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    },
  });

  return io.on('connection', (socket) => {
    console.log('New user on our channel');
  
    socket.on('teste', (message) => {
      socket.emit('teste2', message);
    });
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