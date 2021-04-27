const { Router } = require('express');
const rescue = require('express-rescue');
const messagesService = require('../service/messagesService');
const { validateToken } = require('../middlewares/tokenValidation');

const router = Router();
const OK = 200;
const CREATED = 201;

router.get('/', validateToken, rescue(async (req, res) => {
  const userEmail = req.user.dataValues.email;
  // console.log('user email', userEmail);
  const messages = await messagesService.getAll(userEmail);
  res.status(OK).json(messages);
}));

router.post('/', validateToken, rescue(async (req, res) => {
  const { email, sentAt, message } = req.body;
  await messagesService.createMessage(email, sentAt, message);
  res.status(CREATED).json({ email, sentAt, message });
}));

module.exports = router;
