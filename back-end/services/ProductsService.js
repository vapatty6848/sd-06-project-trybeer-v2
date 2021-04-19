const productsModel = require('../models/ProductsModel');

const getAll = async () => productsModel.getAll();

const getPriceAndNameById = async (id) => productsModel.getPriceById(id);

module.exports = {
  getAll,
  getPriceAndNameById,
};