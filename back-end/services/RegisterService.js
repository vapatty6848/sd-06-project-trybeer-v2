const { Register } = require('../models');

const createUser = async (user) => Register.createUser(user);
const updateName = async (user) => Register.updateName(user);

module.exports = {
  createUser,
  updateName,
};
