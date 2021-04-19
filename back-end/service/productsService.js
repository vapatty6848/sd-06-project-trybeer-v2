const productsModel = require('../model/productsModel');

const getAllProducts = async () => productsModel.getAllProducts();

module.exports = {
  getAllProducts,
};
