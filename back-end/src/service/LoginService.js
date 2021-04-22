const { users } = require('../database/models');
const { generateNewToken } = require('../utils');

const generateToken = async (email) => {
  const User = await users.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

  const token = generateNewToken(email);
  const result = { ...User.dataValues, token };

  return result;
};

module.exports = {
  generateToken,
};
