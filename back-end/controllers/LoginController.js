const { Router } = require('express');
const { LoginService, status200 } = require('../services')

const rescue = require('express-rescue');

const LoginRouter = new Router();

LoginRouter.get('/', rescue(async (_req, res) => {
  const users = await LoginService.getAll();
  return res.status(status200).json(users);
}));

module.exports = LoginRouter;
