const { chat } = require('../../services');

module.exports = (ioServer, socket, token) => {
  const getUserMessages = async () => {
    try {
      console.log('backend chat > usuário logou');
      const getMessages = await chat.getMessagesByUserId(token);
      const storedMessages = (getMessages) ? getMessages.messages : [];
      socket.emit('server:storedMessages', storedMessages);
    } catch (e) {
      throw new Error(e);
    }
  };

  socket.on('user:login', getUserMessages);
};
