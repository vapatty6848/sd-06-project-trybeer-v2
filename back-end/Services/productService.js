const models = require('../models');

require('dotenv').config();

const NOT_FOUND = 404;

const findAllProducts = async (_req, res) => {
  const products = await models.products.findAll();

  if (!products) res.status(NOT_FOUND).json({ message: 'Products not found' });

  return res.status(200).json(products);
};

module.exports = {
  findAllProducts,
};