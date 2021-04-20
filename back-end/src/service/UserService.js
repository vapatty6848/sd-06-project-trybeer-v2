const { users } = require('../database/models');

const registerUser = async (name, email, password, role) => users
.create({ name, email, password, role });

const updateUser = async (name, email) => users.update({ name }, { where: { email } });

  module.exports = {
    registerUser,
    updateUser,
  };