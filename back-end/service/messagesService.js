const Messages = require('../modelMongoDB/messagesModel');

const createMessage = async (email, sentAt, message) => Messages
.createMessage(email, sentAt, message);

const getAll = async (userEmail) => Messages.getAll(userEmail);

const getAllMessagesAdmin = async (userEmail) => Messages.getAllMessagesAdmin(userEmail);

module.exports = {
  createMessage,
  getAll,
  getAllMessagesAdmin,
};
