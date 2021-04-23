const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models');
const { validateUserRegister } = require('../middlewares/userMiddleware');

const routerRegister = Router();

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const SECRET = 'senha';

routerRegister.post('/', validateUserRegister, async (req, res, next) => {
  const { name, email, password, seller } = req.body.user;
  const role = seller ? 'administrator' : 'client';  
  try {
    await users.create({ name, email, password, role });
    const payload = {
      iss: 'Trybeer',
      aud: 'indentity',
      userData: email,
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);
    return res.status(200).json({ user: { name, email, role, token } });
  } catch (err) {
    console.log(err.message);
    return next({ status: 400, message: 'E-mail already in database.' });
  }
});

module.exports = routerRegister;