const { Router } = require('express');
const rescue = require('express-rescue');
const LoginService = require('../service/LoginService');

const ProfileController = new Router();

const OK = 200;

ProfileController.post('/', rescue(async (req, res) => {
  const { email: requestEmail } = req.body;
  const { name } = await LoginService.getByEmail(requestEmail);

  res.status(OK).json(name);
}));

ProfileController.put('/', rescue(async (req, res) => {
  const { newName, email } = req.body;
  await LoginService.update(newName, email);

  res.status(OK).json({ message: 'Atualização concluída com sucesso' });
}));

module.exports = ProfileController;
