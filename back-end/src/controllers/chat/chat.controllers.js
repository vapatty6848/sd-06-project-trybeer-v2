const { chat } = require('../../services');

module.exports = (ioServer, socket, token) => {
  const chatMessage = async ({ msg }) => {
    await chat.saveMessage(msg, token);
    ioServer.to(token.roomKey).emit('chat:serverMessage', msg);
  };

  socket.on('chat:clientMessage', chatMessage);
  socket.on('chat:adminMessage', chatMessage);
};
