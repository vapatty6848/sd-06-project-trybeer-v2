const { Router } = require('express');
const productsService = require('../services/ProductsService');

const ProductsRouter = new Router();

ProductsRouter.get('/', async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

ProductsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getPriceAndNameById(id);
  res.status(200).json(product);
});

module.exports = ProductsRouter;