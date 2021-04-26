const { Router } = require('express');
const messages = require('../modelMongo/messages');
const { isUserLoggedIn } = require('../middlewares/validations');

const ChatController = new Router();

ChatController.get('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const { user: { email } } = req;
    const userMessages = await messages.getByNickname(email);

    if (!userMessages) return res.status(404).json([]);
    return res.status(200).json(userMessages.messages);
  } catch (err) {
    next(err);
  }
});

ChatController.post('/', async (req, res, next) => {
  try {
    const { email, message } = req.body;
    await messages.saveMessage(email, message);
    return res.status(200).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

ChatController.post('/admin/', async (req, res, next) => {
  try {
    const { nickname, sender, message } = req.body;
    console.log('INFOBACK', nickname, sender, message);
    const chat = await messages.saveMessageAdmin(nickname, sender, message);
    return res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
});

module.exports = ChatController;