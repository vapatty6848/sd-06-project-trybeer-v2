const { Product } = require('../models');

const getAllProducts = async () => Product.getAllProducts();

module.exports = {
  getAllProducts,
};
