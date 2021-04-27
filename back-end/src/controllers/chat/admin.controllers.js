const { chatAdmin } = require('../../services');

const getAdminMessages = async (socket, token) => {
  const storedChats = await chatAdmin.getChats(token);
  socket.emit('admin:storedChats', storedChats);
};

const getRoomMessages = async (socket, { client, userId }) => {
  const roomKey = `${client}-room`;
  socket.join(roomKey);
  const getMessages = await chatAdmin.getMessagesByUserId(userId);
  const storedMessages = getMessages.messages || [];
  socket.emit('admin:storedRoomMessages', storedMessages);
};

const msgClientRoom = async (ioServer, socket, { msg, client, userId }) => {
  await chatAdmin.saveAdminMessage(msg, userId);
  const roomKey = `${client}-room`;
  socket.join(roomKey);
  ioServer.to(roomKey).emit('chat:serverMessage', msg);
};

module.exports = (ioServer, socket, token) => {
  socket.on('admin:login', () => getAdminMessages(socket, token));
  socket.on('admin:getRoomMessages', (payload) => getRoomMessages(socket, payload));
  socket.on('admin:sendMessage', (msg) => msgClientRoom(ioServer, socket, msg));
};
