const { User } = require('../models');

// Get all users
const getAll = async () => User.findAll();

// Edit a user
const editUserService = async (name, email) => {
  const userUpdate = await User.findOne({ where: { email } });
  userUpdate.name = name;
  await userUpdate.save();

  return userUpdate;
};

module.exports = {
  editUserService,
  getAll,
};
