const { Router } = require('express');
const { createMessages, getAllMessages } = require('../models/mongoModel');
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
  const { user, time, message } = req.body;
  const messageCreated = await createMessages(user, time, message);
  return res.status(CREATED).json(messageCreated);
});

routerMessage.get('/', async (req, res) => {
  const allMessages = await getAllMessages();
  return res.status(SUCCESS).json(allMessages);
});

module.exports = routerMessage;
