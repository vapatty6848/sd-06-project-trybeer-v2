const { chatAdmin } = require('../../services');

module.exports = (ioServer, socket) => {
  const getAdminMessages = async (token) => {
    console.log('backend -> Admin entrou. Carregando mensagens...');
    const storedChats = await chatAdmin.getChats(token);
    socket.emit('admin:storedChats', storedChats);
  };

  socket.on('admin:login', getAdminMessages);
};
