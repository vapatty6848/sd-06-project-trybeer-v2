const { chat } = require('../../services');

module.exports = (ioServer, socket, token) => {
  const getUserMessages = async () => {
    const getMessages = await chat.getMessagesByUserId(token);
    const storedMessages = getMessages.messages || [];
    socket.emit('user:storedMessages', storedMessages);
  };

  socket.on('user:login', getUserMessages);
};
