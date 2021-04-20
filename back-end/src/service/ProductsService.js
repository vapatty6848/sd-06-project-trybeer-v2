const { ProductsModel } = require('../model');

const getAllProducts = async () => ProductsModel.getAllProducts();

module.exports = {
  getAllProducts,
};
