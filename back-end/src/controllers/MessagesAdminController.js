const { Router } = require('express');
const {  
  getAllMessages,
} = require('../models/adminMessages');

const MessagesAdminController = new Router();

MessagesAdminController.get('/', async (req, res) => {
  const messages = await getAllMessages();
  res.status(200).send(messages);
});

MessagesAdminController.get('/:id', async (_req, res) => {
  res.send('test');
});

module.exports = MessagesAdminController;