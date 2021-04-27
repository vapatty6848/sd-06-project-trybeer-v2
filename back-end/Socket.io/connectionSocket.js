const SocketIo = require('socket.io');

// const Chat = require('../mongoDB/SchemaMongoose');
const connection = require('../database/connectionMongo');

const statusUpdate = (socket) => {
  socket.on('statusUpdate', (status) => {
    socket.broadcast.emit('statusUpdate', status);
  });
};

const messageProcess = (socket) => {
  socket.on('message', ({ message, email, cli, date }) => {
    const response = { message, date };

    socket.to(email).emit('message', response);

    connection()
      .then((db) => db.collection('messages').updateOne({ email }, {
        $push: {
          messages: {
            $each: [{ ...response, cli }],
            $sort: { date: 1 },
          },
        },
      }, { upsert: true }));
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
    messageProcess(socket);
    onDisconnect(socket);
    rootRoom(socket);
    onCloseRoom(socket);
  });
};
