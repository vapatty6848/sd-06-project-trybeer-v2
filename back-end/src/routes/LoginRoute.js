const { Router } = require('express');

const { LoginController } = require('../controller');
const { validateField } = require('../middleware');

const LoginRouter = Router();

LoginRouter.post('/',
  validateField,
  LoginController.generateToken);

module.exports = LoginRouter;
