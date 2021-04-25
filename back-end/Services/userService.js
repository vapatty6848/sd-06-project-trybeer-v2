const jwt = require('jsonwebtoken');
const models = require('../models');
const { throwThisError } = require('../Utils');

require('dotenv').config();

const secret = process.env.SECRET || 'secretToken';
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const CONFLICT = 409;

const loginUser = async (req, res) => {
  const { email } = req.body;
  const userData = await models.users.findOne({ where: { email } });
  const user = userData.dataValues;

  if (!user) res.status(NOT_FOUND).json({ message: 'User not found' });

  const token = jwt.sign({ user }, secret);
  user.token = token;

  return res.status(SUCCESS).json({ user });
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const userData = await models.users.findOne({ where: { email } });
  const user = userData;

  if (user) res.status(CONFLICT).json({ message: 'E-mail already in database.' });
  next();
};

const registerNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('backUser', name, email, password, role);
  await models.users.create({ name, email, password, role });
  
  return res.status(CREATED).json({ message: 'OK' });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const updatedData = await models.users.update({ name }, {
    where: { email },
  });

  if (!updatedData) throwThisError(NOT_FOUND, 'Dados inválidos');
  res.status(SUCCESS).json(req.body);
};

module.exports = {
  loginUser,
  validateEmail,
  registerNewUser,
  updateUser,
};
