const { chat } = require('../../services');

module.exports = (ioServer, socket) => {
  const chatMessage = async ({ msg, token }) => {
    await chat.saveMessage(msg, token);
    ioServer.emit('chat:serverMessage', msg);
  };

  socket.on('chat:clientMessage', chatMessage);
};
