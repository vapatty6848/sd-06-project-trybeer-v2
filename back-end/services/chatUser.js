const model = require('../mongo model/messages');

const getAllByUser = async (email) => model.getAllByUser(email);

const saveMessage = async (email, nickname, message, timestamp) => (
  model.saveMessage(email, nickname, message, timestamp)
);

const getCustomersChat = async () => model.getCustomersChat();

module.exports = {
  getAllByUser,
  saveMessage,
  getCustomersChat,
};