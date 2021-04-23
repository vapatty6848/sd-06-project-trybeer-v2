const admin = require('../models/chat/admin.models');

// const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const saveAdminMessage = async (message, userId) => {
  await admin.saveAdminMessage(message, userId);

  return { saved: message, status: 'SAVED' };
};

const getChats = async () => {
  console.log('getting messages for Admin...');
  return admin.getChats();
};

const getMessagesByUserId = async (userId) => {
  console.log('getting messages...');
  return admin.getMessagesByUserId(userId);
};

module.exports = {
  saveAdminMessage,
  getMessagesByUserId,
  getChats,
};
