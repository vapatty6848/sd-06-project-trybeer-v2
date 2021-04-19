const { Router } = require('express');
const userService = require('../services/UsersService');
const registerAndLog = require('../utils/registerAndLog');
const {
  validateEmailDatabase,
  validateRegister,
  isUserLoggedIn,
} = require('../middlewares/validations');

const RegisterRouter = new Router();

RegisterRouter.post('/', validateEmailDatabase, validateRegister, async (req, res, next) => {
  try {
    const { email, name, password, role } = req.body;
    await userService.createUserService({ email, name, password, role });
    const newUser = await registerAndLog(email);
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

RegisterRouter.get('/', async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

RegisterRouter.put('/', isUserLoggedIn, async (req, res, next) => {
  try {
    const { name, email } = req.body;
    await userService.changeName(name, email);
    res.status(200).json({ message: 'User altered' });
  } catch (err) {
    next(err);
  }
});

module.exports = RegisterRouter;