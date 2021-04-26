const rescue = require('express-rescue');

const { OrderService } = require('../service');

const getOrdersById = rescue(async (req, res) => {
  const { id } = req.params;

  const orders = await OrderService.getOrdersById(id);
  return res
    .status(200)
    .json(orders);
});

const updateStatusOrder = rescue(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const update = await OrderService.updateStatusOrder(status, id);

  return res
    .status(200)
    .json(update);
});

const getAllOrders = rescue(async (_req, res) => {
  const orders = await OrderService.getAllOrders();
  return res
    .status(200)
    .json(orders);
});

const getAllOrdersByUser = rescue(async (req, res) => {
  const { id } = req.user;
  const orders = await OrderService.getAllOrdersByUser(id);

  return res
    .status(200)
    .json(orders);
});

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
