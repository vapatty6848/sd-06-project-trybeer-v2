const { Router } = require('express');
const rescue = require('express-rescue');
const messagesService = require('../service/messagesService');
const { validateToken } = require('../middlewares/tokenValidation');

const router = Router();
const OK = 200;
const CREATED = 201;

router.get('/messages', validateToken, rescue(async (req, res) => {
  const messages = await messagesService.getAll();
  res.status(OK).json(messages);
}));

router.post('/messages', validateToken, rescue(async (req, res) => {
  const { email, sentAt, message } = req.body;
  await messagesService.createMessage(email, sentAt, message);
  res.status(CREATED).end();
}));

module.exports = router;
