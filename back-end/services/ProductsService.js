const { products } = require('../models');
const { OK } = require('../utils/allStatusCode');

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await products.findByPk(id);
  return res.status(OK).json(product);
};

const listAllProducts = async (_req, res) => {
  const productList = await products.findAll();
  return res.status(OK).json(productList);
};

module.exports = { getProductById, listAllProducts };