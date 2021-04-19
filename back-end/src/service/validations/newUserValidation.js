const userModel = require('../../model/usersModel');

const BAD_REQUEST = 400;

const invalidEntries = {
  payload: { message: 'Invalid entries. Try again.' },
  status: BAD_REQUEST,
};

const userAlredyRegistered = {
  payload: { message: 'A user with this email already exists.' },
  status: BAD_REQUEST,
};

const newUserValidation = async ({ email, name, role }) => {
  if (!email || !name || !role) return invalidEntries;

  const [result] = await userModel.getUserByEmail(email);
  if (!result) return true;

  return userAlredyRegistered;
};

module.exports = newUserValidation;
