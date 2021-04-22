const { Router } = require('express');

const ChatController = new Router();

ChatController.get('/', async (req, res, next) => {
  try {
    const chat = 'CHATCONTROLLER';
    return res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
});

module.exports = ChatController;