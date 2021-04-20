const Sequelize = require('sequelize');
const { OK } = require('../utils/allStatusCode');
const { sales, sales_products, products } = require('../models');

const allOrders = async (_req, res) => {
  const ordersList = await sales.findAll();
  return res.status(OK).json(ordersList);
};

const getAdminOrder = async (req, res) => {
  const { id } = req.params;
  const order = await sales_products.findAll({
    where: { sale_id: id },
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
  await sales.update({ status: 'DELIVERED' }, { where: { id } });
  return res.status(OK).json({ OK: 'OK' });
};

module.exports = { allOrders, getAdminOrder, updateAdminOrderStatus };