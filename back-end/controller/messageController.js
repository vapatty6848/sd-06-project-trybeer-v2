const { Router } = require('express');
const rescue = require('express-rescue');
const messagesService = require('../service/messagesService');
const { validateToken } = require('../middlewares/tokenValidation');

const router = Router();
const OK = 200;
const CREATED = 201;

router.get('/messages', validateToken, rescue(async (req, res) => {
  const userEmail = req.user.dataValues.email;
  // console.log('user email', userEmail);
  const messages = await messagesService.getAll(userEmail);
  res.status(OK).json(messages);
}));

router.get('/messages/admin', validateToken, rescue(async (req, res) => {
  const messages = await messagesService.getAllMessagesAdmin();
  res.status(OK).json(messages);
}));

router.post('/messages', validateToken, rescue(async (req, res) => {
  const { email, sentAt, message } = req.body;
  await messagesService.createMessage(email, sentAt, message);
  res.status(CREATED).json({ email, sentAt, message });
}));

module.exports = router;
