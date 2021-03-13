const { Router } = require('express');
const rescue = require('express-rescue');
const { status200, RegisterService } = require('../services');
const { LoginValidation } = require('../Middlewares');

const RegisterRouter = new Router();

RegisterRouter.post('/', LoginValidation.LoginValidation, rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await RegisterService.createUser({ name, email, password, role });
  return res.status(status200).json(newUser);
}));

module.exports = RegisterRouter;
