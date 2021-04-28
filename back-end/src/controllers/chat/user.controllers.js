const { verifyToken } = require('../../security');
const { chat } = require('../../services');

module.exports = (ioServer, socket) => {
  console.log('backend -> usuário entrou');
  const getUserMessages = async (token) => {
    const { sub: userId } = verifyToken(token);
    const getStoredMessages = await chat.getMessagesByUserId(userId);
    const storedMessages = (getStoredMessages) ? getStoredMessages.messages : [];
    socket.emit('server:storedMessages', storedMessages);
  };

  socket.on('user:login', getUserMessages);
};
