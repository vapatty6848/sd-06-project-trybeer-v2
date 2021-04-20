const { createProducts } = require('../models');

const getAllProducts = async () => {
  const products = await createProducts.findAll();
  return products;
};

module.exports = {
  getAllProducts,
};
