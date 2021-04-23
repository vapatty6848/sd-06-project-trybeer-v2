const admin = require('../models/chat/admin.models');
const { verifyToken } = require('../security');
// const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const saveAdminMessage = async (message, userId) => {
  // validateMessage(message);

  await admin.saveMessage(message, userId);

  return { saved: message, status: 'SAVED' };
};

const getChats = async (token) => {
  const { role } = verifyToken(token);
  if (role !== 'administrator') throw new Error('Error: user not ADMIN.');
  console.log('getting messages for Admin...');
  return admin.getChats();
};

module.exports = {
  saveAdminMessage,
  getChats,
};
