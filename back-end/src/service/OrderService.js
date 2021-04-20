const { OrderModel } = require('../model');

const getOrdersById = async (id) => OrderModel.getOrdersById(id);

const updateStatusOrder = async (status, id) => OrderModel.updateStatusOrder(status, id);

const getAllOrders = async () => OrderModel.getAllOrders();

const getAllOrdersByUser = async (id) => OrderModel.getAllOrdersByUser(id);

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
