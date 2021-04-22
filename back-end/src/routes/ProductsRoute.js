const { Router } = require('express');

const { ProductsController } = require('../controller');
const { authorization } = require('../middleware');

const ProductsRoute = Router();

ProductsRoute.get('/',
  authorization,
  ProductsController.listProducts);

module.exports = ProductsRoute;