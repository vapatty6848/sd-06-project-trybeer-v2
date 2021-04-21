const { users } = require('../models');

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailVerified = regex.test(email);

  return emailVerified;
};

const validatePassword = (password) => {
  const passwordVerified = password.length >= 6;
  return passwordVerified;
};

const validateName = (name) => {
  const regexName = /^[A-Za-z'\s]+$/;
  const nameLength = name.length >= 12;
  const nameVerified = regexName.test(name);
  return nameLength && nameVerified;
};

const findUserByEmail = (email) => users.findOne({ where: { email } });

const create = async (name, email, password, role) => {
  await users.create({ name, email, password, role });
  const user = { name, email, password, role };
  return user;
};

const validateFieldLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) return res.status(400).json({ message: 'All fields must be filled' });

  if (!validateEmail(email) && !validatePassword(password)) {
    return res.status(400).json({ message: 'incorrect' });
  }
  next();
};

const validateFieldName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'All fields must be filled' });

  if (!validateName(name)) return res.status(400).json({ message: 'incorrect' });

  next();
};

module.exports = {
  validateFieldLogin,
  findUserByEmail,
  validateFieldName,
  create,
};
