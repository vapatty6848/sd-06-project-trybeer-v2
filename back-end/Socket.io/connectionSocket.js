const SocketIo = require('socket.io');

const Chat = require('../mongoDB/SchemaMongoose');

const statusUpdate = (socket) => {
  socket.on('statusUpdate', (status) => {
    socket.broadcast.emit('statusUpdate', status);
  });
};

const messageProcess = (socket, io) => {
  socket.on('message', ({ message, email, cli }) => {
    console.log(message, ' ', email, ' ', cli);
    if (typeof message === 'string' && typeof email === 'string' && typeof cli === 'boolean') {
      console.log('entrou message')
      const date = new Date();
      const response = { message, date };

      io.to(email).emit('message', response);

      Chat.updateOne({ email }, {
        $push: {
          messages: {
            $each: [{ ...response, cli }],
            $sort: { date: 1 },
          },
        },
      }, { upsert: true })
        .then((oiii) => console.log('oiii', oiii));
    }
  });
};

const rootRoom = (socket) => {
  // para escutar a sala
  socket.on('openRoom', (email) => {
    socket.join(email);
  });
};

const onDisconnect = (socket) => {
  socket.on('disconnect', () => {
    // console.log(`Socket Disconnected`);
    console.log('disconnect 1');
  });
};

const onCloseRoom = (socket) => {
  socket.on('closeRoom', (email) => {
    socket.leave(email);
  });
};

module.exports = (httpServer) => {
  const io = SocketIo(httpServer, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    },
  });
  
  io.on('connection', async (socket) => {
    console.log('1 connection foi feita no back');
    statusUpdate(socket);
    messageProcess(socket, io);
    onDisconnect(socket);
    rootRoom(socket);
    onCloseRoom(socket);
  });
};
