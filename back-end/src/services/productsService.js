const Model = require('../models/productsModels');

// Get all users
const getAll = async () => Model.getProducts();

module.exports = {
  getAll,
};