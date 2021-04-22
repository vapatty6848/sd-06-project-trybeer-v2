const { Router } = require('express');
const messages = require('../modelMongo/messages');
const { isUserLoggedIn } = require('../middlewares/validations');

const ChatController = new Router();

ChatController.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const { user: { email } } = req;
    const userMessages = await messages.getByNickname(email);
    return res.status(200).json(userMessages);
  } catch (err) {
    next(err);
  }
});

ChatController.post('/', async (req, res, next) => {
  try {
    const { email, message } = req.body;
    await messages.saveMessage(email, message);
    const chats = await messages.getAll();
    return res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
});

module.exports = ChatController;