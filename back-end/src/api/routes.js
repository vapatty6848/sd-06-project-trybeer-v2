const { Router } = require('express');

const usersController = require('./users/controller');
const salesController = require('./sales/controller');
const productsController = require('./products/controller');
const conversationsController = require('./conversations/controller');

const routes = Router();

routes.use('/users', usersController);
routes.use('/products', productsController);
routes.use('/sales', salesController);
routes.use('/conversations', conversationsController);

module.exports = routes;