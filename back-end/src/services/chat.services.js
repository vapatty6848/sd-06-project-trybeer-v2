const chat = require('../models/chat/chat.models');
const { verifyToken } = require('../security');
// const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const saveMessage = async (message, token) => {
  const { sub: userId } = verifyToken(token.token);
  // validateMessage(message);
  await chat.saveMessage(message, userId);

  return { saved: message, status: 'SAVED' };
};

const getMessagesById = async (userId) => {
  // validateUserName(name);
  console.log('getting messages...');
  return chat.getMessagesById(userId);
};

module.exports = {
  saveMessage,
  getMessagesById,
};
