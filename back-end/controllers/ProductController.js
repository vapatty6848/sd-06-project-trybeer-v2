const { Router } = require('express');
const rescue = require('express-rescue');
const { ProductService, status200 } = require('../services');

const ProductRouter = new Router();

ProductRouter.get('/', rescue(async (_req, res) => {
  const allProducts = await ProductService.getAllProducts();
  return res.status(status200).json(allProducts);
}));

module.exports = ProductRouter;
