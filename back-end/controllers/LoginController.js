const { Router } = require('express');
const registerAndLog = require('../utils/registerAndLog');

const LoginController = new Router();

LoginController.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    const newUser = await registerAndLog(email);
    return res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = LoginController;
