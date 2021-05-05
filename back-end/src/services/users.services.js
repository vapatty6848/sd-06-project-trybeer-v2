const { users } = require('../models/sql/models');
const { generateToken } = require('../security');
const { authRegisterUser, utils: { validateUserName } } = require('../schemas');

const create = async (body) => {
  const data = {
    name: body.name,
    email: body.email,
    password: body.password,
    isVendor: body.isVendor };

  const isEmailAvailable = (data.email)
    ? await users.findOne({ where: { email: data.email } })
    : null;
  authRegisterUser(data, isEmailAvailable);

  data.role = (data.isVendor) ? 'administrator' : 'client';
  const { dataValues: { id: newUserId } } = await users.create(data);
  console.log('novo user: ', newUserId);

  const token = generateToken(newUserId, data.role);
  const { role, name, email } = data;
  return { name, email, token, role };
};

const updateName = async (name, id) => {
  validateUserName(name);
  return users.update({ name }, { where: { id } });
};

module.exports = {
  create,
  updateName,
};
