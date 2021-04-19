const jwt = require('jsonwebtoken');
const UserModel = require('../Model/userModel');
const { throwThisError } = require('../Utils');

require('dotenv').config();

const secret = process.env.SECRET || 'secretToken';
const NOT_FOUND = 404;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.loginUser(email, password);

  if (!user) res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ user }, secret);
  user.token = token;

  return res.status(200).json({ user });
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findUserByEmail(email);

  if (user) res.status(409).json({ message: 'E-mail already in database.' });
  next();
};

const registerNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  await UserModel.registerNewUser(name, email, password, role);
  return res.status(201).json({ message: 'OK' });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const updated = await UserModel.updateUser(name, email);
  if (!updated) throwThisError(NOT_FOUND, 'Dados inválidos');
  
  req.user.name = name;
  res.status(200).json(req.user);
};

module.exports = {
  loginUser,
  validateEmail,
  registerNewUser,
  updateUser,
};
