const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { SalesValidation } = require('../Middlewares');
const { OrdersService } = require('../services');
const validateToken = require('../auth/validateToken');

const OrdersRouter = new Router();

OrdersRouter.post('/', SalesValidation.SalesValidation, rescue(async (req, res) => {
  const { id, totalValue, street, number, date, status, cart } = req.order;
  const sale = { id, totalValue, street, number, date, status };
  const newOrder = await OrdersService.registerOrder(sale);
    
  const { insertId } = newOrder;

  await OrdersService.registerEachProduct(insertId, cart);
  return res.status(status200).json('Pedido registrado com sucesso!');
}));

OrdersRouter.get('/', validateToken, rescue(async (req, res) => {
  const { email } = req.user;
  const orders = await OrdersService.getOrders(email);
  return res.status(status200).json(orders);
}));

module.exports = OrdersRouter;
