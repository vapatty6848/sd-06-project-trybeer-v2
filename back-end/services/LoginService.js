const { Login } = require('../models');

const getByEmail = async (userEmail) => Login.getByEmail(userEmail);

module.exports = {
  getByEmail,
};
