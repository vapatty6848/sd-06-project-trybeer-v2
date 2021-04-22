const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middlewares/authToken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const { user: User } = require('../models');
const { OK, UNAUTHORIZED } = require('../schema/statusSchema');
const LoginController = new Router();

// Post Login
LoginController.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password }});
    const { role } = user;
    const token = jwt.sign({ data: user }, SECRET, jwtConfig);

    return res.status(OK).json({ token, role });
  } catch (e) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
});

module.exports = LoginController;
