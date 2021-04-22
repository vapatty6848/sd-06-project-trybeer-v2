const Sequelize = require('sequelize');
const { OK, BAD_REQUEST } = require('../utils/allStatusCode');
const { sales, salesProducts, products } = require('../models');

const allOrders = async (_req, res) => {
  const ordersList = await sales.findAll();
  return res.status(OK).json(ordersList);
};

const getAdminOrder = async (req, res) => {
  const { id } = req.params;
  const order = await salesProducts.findAll({
    where: { saleId: id },
    attributes: ['quantity',
    [Sequelize.col('products.name'), 'name'],
    [Sequelize.col('products.price'), 'price'],
    [Sequelize.col('sales.status'), 'status'],
    [Sequelize.literal('FORMAT((quantity * products.price), 2)'), 'productPrice']],
    include: [
      { model: products, attributes: [], as: 'products' },
      { model: sales, attributes: [], as: 'sales' },
    ],
  });
  return res.status(OK).json(order);
};

const updateAdminOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ['PENDING', 'PREPARING', 'DELIVERED'];
  if (!valid.some((element) => element === status)) {
    res.status(BAD_REQUEST).json({ err: 'wrong status' });
  }
  await sales.update({ status }, { where: { id } });
  return res.status(OK).json({ OK: 'OK' });
};

module.exports = { allOrders, getAdminOrder, updateAdminOrderStatus };