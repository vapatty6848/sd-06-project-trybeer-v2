const { Router } = require('express');
const models = require('../models');

const productsRouter = new Router();

productsRouter.get('/', async (_req, res) => {
  const allProducts = await models.products.findAll();

  res.status(200).json(allProducts);
});

module.exports = productsRouter;
