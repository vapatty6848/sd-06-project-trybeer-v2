const chat = require('../models/chat/chat.models');
const { verifyToken } = require('../security');
// const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const saveMessage = async (message, token) => {
  const { sub: userId } = verifyToken(token.token);
  // validateMessage(message);
  await chat.saveMessage(message, userId, token.email);

  return { saved: message, status: 'SAVED' };
};

const getMessagesByUserId = async (token) => {
  const { sub: userId } = verifyToken(token.token);
  console.log('getting messages...');
  return chat.getMessagesByUserId(userId);
};

module.exports = {
  saveMessage,
  getMessagesByUserId,
};
