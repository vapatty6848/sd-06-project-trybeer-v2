const { Product } = require('../models');

// Get all users
const getAll = async () => Product.findAll();

module.exports = {
  getAll,
};