const { utils } = require('../models');
const { generateToken } = require('../security');
const { authLogin } = require('../schemas');

const login = async ({ email, password }) => {
  const [user] = await utils.getByFilter({
    table: 'users',
    filter: 'email',
    value: email,
  });
  authLogin(email, password, user);
  const token = generateToken(user.id, user.role);
  const { id, password: _, ...data } = user;
  return { ...data, token };
};

module.exports = {
  login,
};
