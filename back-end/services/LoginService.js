const login = require('../models/Login');

const getAll = async () => await login.getAll();


module.exports = {
  getAll,
}