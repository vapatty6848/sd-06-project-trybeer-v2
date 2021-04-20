const jwt = require('jsonwebtoken');
const models = require('../models');
// const { throwThisError } = require('../Utils');

require('dotenv').config();

const secret = process.env.SECRET || 'secretToken';
// const NOT_FOUND = 404;

const loginUser = async (req, res) => {
  const { email } = req.body;
  const user = await models.user.findOne({ where: { email } });

  if (!user) res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ user }, secret);
  user.token = token;

  return res.status(200).json({ user });
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await models.user.findOne({ where: { email } });

  if (user) res.status(409).json({ message: 'E-mail already in database.' });
  next();
};

const registerNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  await models.user.create({ name, email, password, role });
  return res.status(201).json({ message: 'OK' });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  await models.user.update({ name }, {
    where: { email },
  });
  // if (!updated) throwThisError(NOT_FOUND, 'Dados inválidos');
  res.status(200).json(req.body);
};

module.exports = {
  loginUser,
  validateEmail,
  registerNewUser,
  updateUser,
};
