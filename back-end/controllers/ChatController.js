const { Router } = require('express');
const messages = require('../modelMongo/messages');
const { isUserLoggedIn } = require('../middlewares/validations');

const ChatController = new Router();

ChatController.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const allMessages = await messages.getAll();
    if (!allMessages) return res.status(404).json([]);
    return res.status(200).json(allMessages);
  } catch (err) {
    next(err);
  }
});

ChatController.get('/:room', isUserLoggedIn, async (req, res, next) => {
  try {
    const { room } = req.params;
    const chat = await messages.getByRoom(room);
    if (!chat) return res.status(404).json([]);
    return res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
});

ChatController.post('/', async (req, res, next) => {
  try {
    const { message, from, dest, room } = req.body;
    const resp = await messages.saveMessage(message, from, dest, room);
    return res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = ChatController;