const { chat } = require('../../services');
const { verifyToken } = require('../../security');

module.exports = (ioServer, socket) => {
  const chatMessage = async ({ msg, token }) => {
    const { sub: userId } = verifyToken(token);
    await chat.saveMessage(msg, userId);
    ioServer.emit('chat:serverMessage', msg);
  };

  socket.on('chat:clientMessage', chatMessage);
};
