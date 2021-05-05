const { chatAdmin } = require('../../services');

const getAdminMessages = async (socket, token) => {
  console.log('backend chat > admin logou');
  try {
    const storedChats = await chatAdmin.getChats(token);
    socket.emit('admin:storedChats', storedChats);
  } catch (e) {
    throw new Error(e);
  }
};

const getRoomMessages = async (socket, { client, userId }) => {
  try {
    const roomKey = `${client}-room`;
    socket.join(roomKey);
    const getMessages = await chatAdmin.getMessagesByUserId(userId);
    const storedMessages = (getMessages) ? getMessages.messages : [];
    socket.emit('admin:storedRoomMessages', storedMessages);
  } catch (e) {
    throw new Error(e);
  }
};

const msgClientRoom = async (ioServer, socket, { msg, client, userId }) => {
  try {
    await chatAdmin.saveAdminMessage(msg, userId);
    const roomKey = `${client}-room`;
    socket.join(roomKey);
    ioServer.to(roomKey).emit('chat:serverMessage', msg);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = (ioServer, socket, token) => {
  socket.on('admin:login', () => getAdminMessages(socket, token));
  socket.on('admin:getRoomMessages', (payload) => getRoomMessages(socket, payload));
  socket.on('admin:sendMessage', (msg) => msgClientRoom(ioServer, socket, msg));
};
