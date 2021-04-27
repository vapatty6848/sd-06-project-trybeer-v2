const { Router } = require('express');
const {
  createMessages,
  getAllMessages,
  getUserMessages,
  getMsgUsers,
} = require('../models/mongoModel');
// const {
//   getAllUsersService,
//   createUserService,
//   createAdminService,
// } = require('../services/UsersService');
// const { validateUser, validateEmail, validateAdmin } = require('../middlewares/UsersMid');

const routerMessage = Router();
const CREATED = 201;
const SUCCESS = 200;

routerMessage.post('/', async (req, res) => {
  const { user, time, message, to } = req.body;
  console.log(user, time, message, to);
  const messageCreated = await createMessages(user, time, message, to);
  return res.status(CREATED).json(messageCreated);
});

routerMessage.get('/', async (req, res) => {
  const allMessages = await getAllMessages();
  return res.status(SUCCESS).json(allMessages);
});

routerMessage.get('/messages', async (req, res) => {
  const usersMessages = await getMsgUsers();
  console.log(usersMessages);
  return res.status(SUCCESS).json(usersMessages);
});

routerMessage.get('/userMessages/:email', async (req, res) => {
  const { email } = req.params;
  const messages = await getUserMessages(email);
  
  return res.status(SUCCESS).json(messages);
});

module.exports = routerMessage;
