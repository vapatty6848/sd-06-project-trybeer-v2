const SocketIo = require('socket.io');

const statusUpdate = (socket) => {
  socket.on('statusUpdate', (status) => {
    socket.broadcast.emit('statusUpdate', status);
  });
};

const messageProcess = (socket, io) => {
  socket.on('message', ({ message, email }) => {
    console.log(message);
    const date = new Date();
    const five = 5;
    const hour = date.toLocaleTimeString().substring(0, five);
    io.to(email).emit('message', { message, email, hour });
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
  });
};
