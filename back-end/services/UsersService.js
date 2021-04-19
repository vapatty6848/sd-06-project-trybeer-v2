const userModel = require('../models/UsersModel');

const createUserService = async ({ name, password, email, role }) => userModel
  .createUser({ name, password, email, role });

const getAll = async () => userModel.getAll();

const findByEmail = async (email) => userModel.findByEmail(email);

const changeName = async (name, email) => userModel.update(name, email);

module.exports = {
  createUserService,
  getAll,
  findByEmail,
  changeName,
};
