// const dateFormat = require('dateformat');
const { Router } = require('express');
const rescue = require('express-rescue');
const messagesService = require('../service/messagesService');
const { validateToken } = require('../middlewares/tokenValidation');

/* const formatDate = (data) => {
  const sentAt = dateFormat(data, 'H:MM');
  return sentAt;
}; */

const router = Router();
const OK = 200;
const CREATED = 201;

router.get('/messages', validateToken, rescue(async (req, res) => {
  const userEmail = req.user.dataValues.email;
  // console.log('user email', userEmail);
  const messages = await messagesService.getAll(userEmail);
  res.status(OK).json(messages);
}));

router.post('/messages/admin/private', validateToken, rescue(async (req, res) => {
  const userEmail = req.body.email;
  // console.log('user email', userEmail);
  const messages = await messagesService.getAll(userEmail);
  res.status(OK).json(messages);
}));

router.get('/messages/admin', validateToken, rescue(async (req, res) => {
  const messages = await messagesService.getAllMessagesAdmin();
  // let formattedDate = '';
/*   messages.forEach((message) => {
    const formattedDate = formatDate(message.sentAt);
    message.sentAt = formattedDate;
  }); */

  console.log('l19', messages);
  res.status(OK).json(messages);
}));

router.post('/messages', validateToken, rescue(async (req, res) => {
  const { email, sentAt, message, isAdmin } = req.body;
  await messagesService.createMessage(email, sentAt, message, isAdmin);
  res.status(CREATED).json({ email, sentAt, message, isAdmin });
}));

module.exports = router;
