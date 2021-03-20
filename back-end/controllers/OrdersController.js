const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const validateToken = require('../auth/validateToken');
const { OrdersService } = require('../services');

const OrdersRouter = new Router();

OrdersRouter.post('/', validateToken, rescue(async (req, res) => {
  const { id } = req.user;
  const { totalValue, street, number, saleDate, status } = req.body;
  OrdersService.registerOrder(id, totalValue, street, number, saleDate, status);
  // OrdersService.registerEachProduct(saleId, cart);
  return res.status(status200).json('Sucesso');
}));

module.exports = OrdersRouter;
