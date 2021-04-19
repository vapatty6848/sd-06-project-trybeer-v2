const { listOrdersByUser, getOrderById } = require('../models/OrdersModel');
const { OK } = require('../utils/allStatusCode');
const tokenValidation = require('../utils/tokenValidation');

const allOrdersByUser = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;

  const [ordersList] = await listOrdersByUser(id);
  return res.status(OK).json(ordersList);
};

const getUserOrder = async (req, res) => {
  const { id } = req.params;
  const [order] = await getOrderById(id);
  return res.status(OK).json(order);
};

module.exports = { allOrdersByUser, getUserOrder };