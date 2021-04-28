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

const getCustomersChat = async ({ io }) => {
  const allCustomersChat = await services.getCustomersChat();
  const customersList = allCustomersChat.map((customer) => {
    const lastMessage = customer.messages[customer.messages.length - 1].timestamp;
    const lastTimestamp = `Última mensagem às ${lastMessage}`;
    return Object.assign(customer, { lastTimestamp });
  });

  io.emit('customersList', customersList);
};

module.exports = {
  saveMessage,
  getAllMessages,
  getCustomersChat,
};