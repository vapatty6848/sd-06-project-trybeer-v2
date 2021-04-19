const Model = require('../models/profileModels');

// Get all users
const getAll = async () => Model.getAll();

// Edit a user
const editUserService = async (name, email) => {
  const users = await Model.editUserModels(name, email);
  return users;
};

module.exports = {
  editUserService,
  getAll,
};
