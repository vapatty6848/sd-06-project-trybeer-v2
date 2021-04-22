const { Router } = require('express');
const rescue = require('express-rescue');
const { Users } = require('../../models');

const ProfileController = new Router();

const OK = 200;

ProfileController.post('/', rescue(async (req, res) => {
  const { email } = req.body;
  const { name } = await Users.findOne({ where: { email } });

  res.status(OK).json(name);
}));

ProfileController.put('/', rescue(async (req, res) => {
  const { newName, email } = req.body;
  await Users.update(
    { name: newName },
    { where: { email } },
  );

  res.status(OK).json({ message: 'Atualização concluída com sucesso' });
}));

module.exports = ProfileController;
