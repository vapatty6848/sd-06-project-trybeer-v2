const socketHandler = (io) => (socket) => {
  console.log('Novo usuário conectado', socket.id);

  socket.on('emit', (email) => {
    console.log('Email SOCKET emit', email);
  });
  socket.on('connectRoom', (room) => {
    socket.join(room);
  });
  socket.on('chat.sendMessage', (data) => {
    const dataWithTime = { ...data, date: new Date() };
    const { from, dest } = data;
    const key = [from, dest].sort().join('-');
    // console.log('data', data);
    // console.log('com tempo', dataWithTime);
    // console.log('key', key);
    io.to(key).emit('chat.receiveMessage', dataWithTime);
  });
};

module.exports = socketHandler;
