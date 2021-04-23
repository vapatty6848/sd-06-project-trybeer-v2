const { Router } = require('express');
const moment = require('moment');
const services = require('../services/chatUser');
const validateToken = require('../auth/validateToken');

const chatUserRouter = new Router();

chatUserRouter.get('/', validateToken, async (req, res) => {
  const { email } = req.user;
  const allMessages = await services.getAllByUser(email);

  return res.status(200).json(allMessages);
});

chatUserRouter.post('/', validateToken, async (req, res) => {
  const { email, role } = req.user;
  const { message } = req.body;
  const timestamp = moment().format('hh:mm');
  const nickname = role === 'admin' ? 'Loja' : email;

  await services.saveMessage(email, nickname, message, timestamp);

  return res.status(200).json();
});

module.exports = chatUserRouter;