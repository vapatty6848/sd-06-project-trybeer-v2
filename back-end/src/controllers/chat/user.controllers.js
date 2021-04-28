const { chat } = require('../../services');

module.exports = (ioServer, socket, token) => {
  const getUserMessages = async () => {
    console.log('backend chat > usuário logou');
    const getMessages = await chat.getMessagesByUserId(token);
    const storedMessages = getMessages.messages || [];
    socket.emit('server:storedMessages', storedMessages);
  };

  socket.on('user:login', getUserMessages);
};
