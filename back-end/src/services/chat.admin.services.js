const admin = require('../models/chat/admin.models');

const errors = {
  C_ERR_ACC_DND: 'C_ERR_ACC_DND',
};

const saveAdminMessage = async (message, userId) => {
  const userInteger = parseInt(userId, 10);
  await admin.saveAdminMessage(message, userInteger);

  return { saved: message, status: 'SAVED' };
};

const getChats = async (token) => {
  if (token.role !== 'administrator') throw new Error(errors.C_ERR_ACC_DND);
  console.log('getting messages for Admin...');
  return admin.getChats();
};

const getMessagesByUserId = async (userId) => {
  console.log('getting messages...');
  const userInteger = parseInt(userId, 10);
  return admin.getMessagesByUserId(userInteger);
};

const removeMessagesByUserId = async (userId) => {
  console.log('deleting messages...');
  const userInteger = parseInt(userId, 10);
  return admin.removeMessagesByUserId(userInteger);
};

module.exports = {
  saveAdminMessage,
  getMessagesByUserId,
  getChats,
  removeMessagesByUserId,
};
