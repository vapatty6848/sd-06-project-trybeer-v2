const { Router } = require('express');
const { listAllProducts, getProductById } = require('../services/ProductsService');

const ProductsController = new Router();

ProductsController.get('/', listAllProducts);
ProductsController.get('/:id', getProductById);

module.exports = ProductsController;