const { chat } = require('../../services');
const { verifyToken } = require('../../security');

module.exports = (ioServer, socket) => {
  console.log('backend -> usuário entrou');
  const getUserMessages = async (token) => {
    const { sub: userId } = verifyToken(token);
    const storedMessages = await chat.getMessagesById(userId);
    socket.emit('user:storedMessages', storedMessages.messages);
  };

  socket.on('user:login', getUserMessages);
};
