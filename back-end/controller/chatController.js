const { Router } = require('express');
const { addMessage, getAllMessages } = require('../model/chat');

const chatRouter = new Router();

chatRouter.post('/', async (req, res) => {
  try {
    const message = req.body;
    await addMessage(message);
    res.status(201).send(message);
  } catch (err) {
    res.status(404).send('ERRO');
    throw new Error(err);
  }
});

chatRouter.get('/', async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json({ messages });
  } catch (err) {
    res.status(404).send('ERRO');
    throw new Error(err);
  }
});

module.exports = chatRouter;
