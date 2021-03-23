const { Router } = require('express');
const rescue = require('express-rescue');
const { status200, RegisterService } = require('../services');
const { RegisterValidation } = require('../Middlewares');

const RegisterRouter = new Router();

RegisterRouter.post('/', RegisterValidation.RegisterValidation, rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await RegisterService.createUser({ name, email, password, role });
  return res.status(status200).json({ newUser, message: 'Usuário cadastrado!' });
}));

module.exports = RegisterRouter;
