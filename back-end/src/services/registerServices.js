const { User } = require('../models/');
const httpResponse = require('../utils/httpResponses');
const validators = require('../utils/validationsEntries');
// Create a user
const create = async (name, email, password, role) => {
  if (!validators.validName(name)
  || !validators.validEmail(email)
  || !validators.validPassword(password)) return httpResponse.INVALID_DATA;

  const userCreated = await User.create({name, email, password, role});
  
  if (!userCreated) return httpResponse.INVALID_DATA;
  
  return { name, email, role };
};

// Delete a user
const exclude = async (id) => {
  const users = await User.destroy({where: { id } });
  return users;
};

module.exports = {
  create,
  exclude,
};
