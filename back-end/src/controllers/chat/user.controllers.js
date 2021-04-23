const { chat } = require('../../services');
const { verifyToken } = require('../../security');

module.exports = (ioServer, socket) => {
  const getUserMessages = async (token) => {
    console.log('backend -> usuário entrou');
    const { sub: userId } = verifyToken(token);
    const storedMessages = await chat.getMessagesById(userId);
    socket.emit('user:storedMessages', storedMessages.messages);
  };

  socket.on('user:login', getUserMessages);
};
