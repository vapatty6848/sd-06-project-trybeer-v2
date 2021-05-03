const Messages = require('../modelMongoDB/messagesModel');

const createMessage = async (email, sentAt, message, isAdmin) => Messages
.createMessage(email, sentAt, message, isAdmin);

const getAll = async (userEmail) => Messages.getAll(userEmail);

const getAllMessagesAdmin = async (userEmail) => Messages.getAllMessagesAdmin(userEmail);

module.exports = {
  createMessage,
  getAll,
  getAllMessagesAdmin,
};
