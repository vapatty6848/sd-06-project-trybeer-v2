const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { LoginValidation } = require('../Middlewares');
const createToken = require('../auth/createToken');

const LoginRouter = new Router();

LoginRouter.post('/', LoginValidation.LoginValidation, rescue(async (req, res) => {
  const { email, id, role, name } = req.infoUser;
  const createdToken = createToken({ email, id, role, name });
  return res.status(status200).json({ token: createdToken });
}));

module.exports = LoginRouter;
