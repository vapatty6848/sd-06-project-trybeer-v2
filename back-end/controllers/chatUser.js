const moment = require('moment');
const services = require('../services/chatUser');

const getAllMessages = async ({ email, io }) => {
  const [{ messages }] = await services.getAllByUser(email);
  io.emit('message', messages);
};

const saveMessage = async ({ nickname, message, email, io }) => {
  const timestamp = moment().format('HH:mm');
  
  await services.saveMessage(email, nickname, message, timestamp);

  const [{ messages }] = await services.getAllByUser(email);

  console.log('allMessages', messages);

  io.emit('message', messages);
};

module.exports = { saveMessage, getAllMessages };