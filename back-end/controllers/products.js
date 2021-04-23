const { Router } = require('express');
const services = require('../services/products');

const productsRouter = new Router();

productsRouter.get('/', async (_req, res) => {
  const responseProducts = await services.getAllProducts();
  const products = responseProducts.map((product) => product.dataValues);

  return res.status(200).json({ products });
});

module.exports = { productsRouter };