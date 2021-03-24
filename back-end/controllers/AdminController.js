const { Router } = require('express');
const rescue = require('express-rescue');
const { status200 } = require('../services');
const { OrdersService } = require('../services');
const validateToken = require('../auth/validateToken');

const AdminRouter = new Router();

AdminRouter.get('/', validateToken, rescue(async (_req, res) => {
  const sales = await OrdersService.getSalesForAdmin();
  return res.status(status200).json(sales);
}));

AdminRouter.get('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;
  const saleDetails = await OrdersService.getOrderDetailsByid(id);
  return res.status(status200).json(saleDetails);
}));

AdminRouter.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  await OrdersService.updateStatus(id);
  return res.status(status200).json({ message: 'Pedido atualizado' });
}));

module.exports = AdminRouter;
