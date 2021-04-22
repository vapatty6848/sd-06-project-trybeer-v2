const { user } = require('../models');

const getUser = async (email, password) => user.findOne({ where: { email, password } });

const getUserByEmail = async (email) => user.findOne({ where: { email } });

const addUser = async (name, email, password, role) => user.create(name, email, password, role);

const updateUser = async (name, email) => user.update({ name }, { where: { email } });

module.exports = {
  getUser,
  getUserByEmail,
  addUser,
  updateUser,
};
