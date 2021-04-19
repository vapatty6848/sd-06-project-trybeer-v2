const Model = require('../models/registerModels');
const httpResponse = require('../utils/httpResponses');
const validators = require('../utils/validationsEntries');
// Create a user
const create = async (name, email, password, role) => {
  if (!validators.validName(name)
  || !validators.validEmail(email)
  || !validators.validPassword(password)) return httpResponse.INVALID_DATA;

  const userCreated = await Model.createUser(name, email, password, role);
  
  if (!userCreated.insertId) return httpResponse.INVALID_DATA;
  
  return { name, email, role };
};

// Delete a user
const exclude = async (id) => {
  const users = await Model.exclude(id);
  return users;
};

// Edit a user
const edit = async (prevName, nextName) => {
  const users = await Model.edit(nextName, prevName);
  return users;
};

module.exports = {
  create,
  exclude,
  edit,
};
