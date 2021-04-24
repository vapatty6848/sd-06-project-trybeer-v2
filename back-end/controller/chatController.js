const { Router } = require('express');
const { addMessage, getAllUsers, getMessages, getLastMessage } = require('../model/chat');

const chatRouter = new Router();

chatRouter.post('/', async (req, res) => {
  try {
    const message = req.body;
    await addMessage(message);
    res.status(201).send(message);
  } catch (err) {
    res.status(404).send('ERROR');
    throw new Error(err);
  }
});

chatRouter.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    const usersArr = users.map(({ _id: user }) => (user))
      .filter((item) => item !== 'Loja');
    res.status(200).json(usersArr);
  } catch (err) {
    res.status(404).send('ERROR');
    throw new Error(err);
  }
});

chatRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await getMessages(id);
    res.status(200).json(messages);
  } catch (err) {
    res.status(404).send('ERROR');
    throw new Error(err);
  }
});

chatRouter.get('/message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getLastMessage(id);
    res.status(200).json(message);
  } catch (err) {
    res.status(404).send('ERROR');
    throw new Error(err);
  }
});

module.exports = chatRouter;
