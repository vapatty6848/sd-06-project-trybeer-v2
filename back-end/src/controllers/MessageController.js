const { Router } = require('express');
const {  
  getAllMessages,
  createMessage,
} = require('../models/messages');

const MessageController = new Router();

MessageController.get('/', async (req, res) => {
  const { email } = req.headers;
  const messages = await getAllMessages(email);
  res.status(200).send(messages);
});

MessageController.post('/', async (req, res) => {
  const { email, message, date } = req.body;
  const newMessage = await createMessage(email, message, date);
  res.status(200).send(newMessage);
});

module.exports = MessageController;