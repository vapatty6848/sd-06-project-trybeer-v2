const { products } = require('../database/models');

const getAllProducts = async () => products.findAll();

module.exports = {
  getAllProducts,
};
