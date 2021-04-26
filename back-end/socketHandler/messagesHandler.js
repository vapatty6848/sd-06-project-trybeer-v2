module.exports = (io, socket) => {
  const createMessage = () => {
    console.log('teste');
    io.emit('Está funcionando');
  };
  socket.on('chat:sendMessage', createMessage);
};
