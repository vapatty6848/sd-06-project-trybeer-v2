const { users } = require('../models/sql/models');
const { generateToken } = require('../security');
const { authLogin } = require('../schemas');

const login = async ({ email, password }) => {
  const user = await users.findOne({ where: { email } });
  authLogin(email, password, user);
  const { dataValues } = user;
  const token = generateToken(dataValues.id, dataValues.role);
  return { name: dataValues.name, email: dataValues.email, role: dataValues.role, token };
};

module.exports = {
  login,
};
