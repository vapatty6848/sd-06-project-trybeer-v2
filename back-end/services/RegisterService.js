const { Register } = require('../models');

const createUser = async (user) => Register.createUser(user);

module.exports = {
  createUser,
};
