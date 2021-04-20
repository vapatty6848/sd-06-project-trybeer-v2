const { sales, sales_products } = require('../models');
const { OK } = require('../utils/allStatusCode');
const tokenValidation = require('../utils/tokenValidation');

const allOrdersByUser = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  // eslint-disable-next-line camelcase
  const ordersList = await sales.findAll({ where: { user_id: id },
    include: [{ model: sales_products, as: 'sales_products'}] });
    console.log(ordersList);
  return res.status(OK).json(ordersList);
};

const getUserOrder = async (req, res) => {
  const { id } = req.params;
  const order = await sales.findByPk(id);
  return res.status(OK).json(order);
};

module.exports = { allOrdersByUser, getUserOrder };