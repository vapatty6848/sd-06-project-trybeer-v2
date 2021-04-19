const { Router } = require('express');
const { allOrdersByUser, getUserOrder } = require('../services/OrdersService');

const OrdersController = new Router();

OrdersController.get('/', allOrdersByUser);
OrdersController.get('/:id', getUserOrder);

module.exports = OrdersController;