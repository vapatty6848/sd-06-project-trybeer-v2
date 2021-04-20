const { Router } = require('express');

const { OrderController } = require('../controller');
const { authorization } = require('../middleware');

const OrderRoute = Router();

OrderRoute.get('/admin',
  authorization,
  OrderController.getAllOrders);

OrderRoute.get('/:id',
  authorization,
  OrderController.getOrdersById);

OrderRoute.put('/:id',
  OrderController.updateStatusOrder);

OrderRoute.get('/',
  authorization,
  OrderController.getAllOrdersByUser);

module.exports = OrderRoute;
