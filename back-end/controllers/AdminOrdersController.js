const { Router } = require('express');
const {
  allOrders,
  getAdminOrder,
  updateAdminOrderStatus,
} = require('../services/AdminOrdersService');

const AdminOrdersController = new Router();

AdminOrdersController.get('/', allOrders);
AdminOrdersController.get('/:id', getAdminOrder);
AdminOrdersController.put('/:id', updateAdminOrderStatus);

module.exports = AdminOrdersController;