const { productById, listProducts } = require('../models/ProductsModel');
const { OK } = require('../utils/allStatusCode');

const getProductById = async (req, res) => {
  const { id } = req.params;
  const [[product]] = await productById(id);
  return res.status(OK).json(product);
};

const listAllProducts = async (_req, res) => {
  const [productList] = await listProducts();
  return res.status(OK).json(productList);
};

module.exports = { getProductById, listAllProducts };