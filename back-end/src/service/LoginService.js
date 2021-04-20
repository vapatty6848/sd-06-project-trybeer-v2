const { users } = require('../database/models');
const { generateNewToken } = require('../utils');

const generateToken = async (email) => {
  const user = await users.findOne({ where: { email } }, { attributes: { exclude: ['password'] } });

  const token = generateNewToken(email);
  const result = { ...user, token };

  return result;
};

module.exports = {
  generateToken,
};
