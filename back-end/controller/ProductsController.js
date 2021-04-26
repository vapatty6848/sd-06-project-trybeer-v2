const { Router } = require('express');
const { product: Product } = require('../models');
const { verifyLogin } = require('../middlewares/authToken');
const { OK } = require('../schema/statusSchema');

const ProductsController = new Router();

// Get All products
ProductsController.get('/', verifyLogin, async (_req, res) => {
  const products = await Product.findAll();
  return res.status(OK).json(products);
});

module.exports = ProductsController;
