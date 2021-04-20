const { Router } = require('express');
const rescue = require('express-rescue');
const SalesService = require('../service/SalesService');
const OrdersService = require('../service/OrdersService');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.get('/', rescue(async (req, res) => {
  const sales = await SalesService.getAll();
  return res.status(OK).json(sales);
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const orderInfo = await OrdersService.getDetails(id);

    return res.status(OK).json(orderInfo);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

router.put('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;
  const order = await OrdersService.updateStatus(id, newStatus);

  res.status(OK).json(order);
}));

module.exports = router;
