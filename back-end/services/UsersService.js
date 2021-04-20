const { user } = require('../models');

const createUserService = async ({ name, password, email, role }) => user
  .create({ name, password, email, role });

const getAll = async () => user.findAll();

const findByEmail = async (email) => user.findOne({ where: { email } });

const changeName = async (name, email) => user.update({ name }, { where: { email } });

module.exports = {
  createUserService,
  getAll,
  findByEmail,
  changeName,
};
