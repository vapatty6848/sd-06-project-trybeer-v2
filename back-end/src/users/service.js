const { Router } = require('express');
const usersService = require('../service/usersService');

const controller = Router();

// LOGIN-----------------------------------------------------------------------
controller.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  const result = await usersService.loginUser({ email, password });
  if (result.payload) return next(result);
  
  return res.status(200).json(result);
});

module.exports = controller;

// UPDATE - TROCA DE NOME------------------------------------------------------
controller.put('/', async (req, res, next) => {
  const { authorization: token } = req.headers;
  const { email, name } = req.body;

  const result = await usersService.updateUser({ name, email, token });
  if (result.payload) return next(result);

  return res.status(200).json(result);
});

// CREATE ---------------------------------------------------------------------
controller.post('/', async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const result = await usersService.createUser({ name, email, password, role });
  if (result.payload) return next(result);
  
  return res.status(200).json(result);
});

module.exports = controller;
