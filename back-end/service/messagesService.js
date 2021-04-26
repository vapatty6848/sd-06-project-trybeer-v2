const Messages = require('../modelMongoDB/messagesModel');

const createMessage = async (email, sentAt, message) => Messages
.createMessage(email, sentAt, message);

const getAll = async () => Messages.getAll();

module.exports = {
  createMessage,
  getAll,
};
