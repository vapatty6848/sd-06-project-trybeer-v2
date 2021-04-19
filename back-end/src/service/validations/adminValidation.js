const userModel = require('../../model/usersModel');

const UNAUTHORIZED = 401;

const notAdmin = {
  payload: { message: 'Only administrators can add products.' },
  status: UNAUTHORIZED,
};

const adminValidation = async (email) => {
  if (!email) return notAdmin;

  const [result] = await userModel.getUserByEmail(email);

  if (result) {
    const { role } = result;

    if (role === 'administrator') return result;
  }

  return notAdmin;
};

module.exports = adminValidation;
