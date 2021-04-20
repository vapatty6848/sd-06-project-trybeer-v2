const { Router } = require('express');

const { SalesController } = require('../controller');

const SaleRoute = Router();

SaleRoute.post('/', SalesController.registerSale);

SaleRoute.post('/products', SalesController.regSalesProducts);

module.exports = SaleRoute;