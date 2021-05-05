const { chat } = require('../../services');

module.exports = (ioServer, socket, token) => {
  const chatMessage = async ({ msg }) => {
    try {
      await chat.saveMessage(msg, token);
      ioServer.to(token.roomKey).emit('chat:serverMessage', msg);
    } catch (e) {
      throw new Error(e);
    }
  };

  socket.on('chat:clientMessage', chatMessage);
  socket.on('chat:adminMessage', chatMessage);
};
