const { Router } = require('express');
const messages = require('../modelMongo/messages');
const ordersService = require('../services/OrdersService');

const AdminRouter = new Router();

AdminRouter.get('/orders', async (_req, res, next) => {
  try {
    const orders = await ordersService.getAll();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

AdminRouter.get('/orders/details/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await ordersService.getByIdAdmin(id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

AdminRouter.put('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await ordersService.alter({ id, status });
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    next(err);
  }
});

AdminRouter.get('/chats', async (req, res, next) => {
  try {
    const chats = await messages.getAll();
    return res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
});

module.exports = AdminRouter;
