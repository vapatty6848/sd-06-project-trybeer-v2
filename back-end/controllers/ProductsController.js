const { Router } = require('express');
const { products } = require('../models');

const routerProducts = Router();

routerProducts.get('/', async (_req, res) => {
  const product = await products.findAll();
  res.status(200).json(product);
});

module.exports = routerProducts;
