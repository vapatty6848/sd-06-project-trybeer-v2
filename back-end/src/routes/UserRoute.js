const { Router } = require('express');

const { emailAlreadyExists } = require('../middleware');
const { UserController } = require('../controller');

const UserRoute = Router();

UserRoute.post('/', emailAlreadyExists, UserController.registerUser);

UserRoute.put('/', UserController.updateUser);

module.exports = UserRoute;
