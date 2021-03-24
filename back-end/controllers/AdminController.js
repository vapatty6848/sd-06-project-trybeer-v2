const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { OrdersService } = require('../services');
const validateToken = require('../auth/validateToken');

const AdminRouter = new Router();

AdminRouter.get('/', validateToken, rescue(async (_req, res) => {
  const orders = await OrdersService.getSalesForAdmin();
  return res.status(status200).json(orders);
}));

module.exports = AdminRouter;
