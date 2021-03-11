const login = require('../models/Login');

const getAll = async () => login.getAll();

module.exports = {
  getAll,
};
