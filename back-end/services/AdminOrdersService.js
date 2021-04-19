const {
  listAllOrders,
  getAdminOrderById,
  updateStatusOrder,
} = require('../models/AdminOrdersModel');
const { OK } = require('../utils/allStatusCode');

const allOrders = async (req, res) => {
  const [ordersList] = await listAllOrders();
  return res.status(OK).json(ordersList);
};

const getAdminOrder = async (req, res) => {
  const { id } = req.params;
  const [order] = await getAdminOrderById(id);
  return res.status(OK).json(order);
};

const updateAdminOrderStatus = async (req, res) => {
  const { id } = req.params;
  await updateStatusOrder(id, 'DELIVERED');
  return res.status(OK).json({ OK: 'OK' });
};

module.exports = { allOrders, getAdminOrder, updateAdminOrderStatus };