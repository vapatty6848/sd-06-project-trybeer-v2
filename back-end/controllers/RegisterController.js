const { Router } = require('express');
const RegisterService = require('../services/RegisterService');

const RegisterController = new Router();

RegisterController.post('/', RegisterService);

module.exports = RegisterController;