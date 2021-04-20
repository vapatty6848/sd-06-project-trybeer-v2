const rescue = require('express-rescue');

const { UserService } = require('../service');

const registerUser = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;

  const registeredUser = await UserService.registerUser(name, email, password, role);

  return res
    .status(201)
    .json(registeredUser);
});

const updateUser = rescue(async (req, res) => {
  const { name, email } = req.body;

  const updated = await UserService.updateUser(name, email);

  return res
    .status(200)
    .json(updated);
});

module.exports = {
  registerUser,
  updateUser,
};
