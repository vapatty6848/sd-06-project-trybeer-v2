const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

module.exports = {
  getAllProducts,
};