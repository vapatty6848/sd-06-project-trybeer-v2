const { Router } = require('express');
const ordersService = require('../services/OrdersService');
const { isUserLoggedIn } = require('../middlewares/validations');

const OrdersRouter = new Router();

OrdersRouter.get('/:id', isUserLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await ordersService.getAllByUser(id);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

OrdersRouter.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const order = await ordersService.getById(id);
  res.status(200).json(order);
});

OrdersRouter.post('/', async (req, res, next) => {
  try {
    const {
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    } = req.body;

    const newOrder = await ordersService
    .createOrderService({ userId, totalPrice, deliveryAddress, deliveryNumber });
    const { id: saleId } = newOrder;
    await ordersService.createOrderProductService({ cart, saleId });
    return res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = OrdersRouter;