const { Router } = require('express');
const LoginServices = require('../services/LoginServices');

const LoginController = new Router();

LoginController.post('/', LoginServices);

module.exports = LoginController;
