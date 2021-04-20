const { UserModel } = require('../model');

const registerUser = async (name, email, password, role) => UserModel
  .registerUser(name, email, password, role);

const updateUser = async (name, email) => UserModel.updateUser(name, email);

  module.exports = {
    registerUser,
    updateUser,
  };