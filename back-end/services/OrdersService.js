const Sequelize = require('sequelize');
const { sales, salesProducts, products } = require('../models');
const { OK } = require('../utils/allStatusCode');
const tokenValidation = require('../utils/tokenValidation');

const allOrdersByUser = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  // eslint-disable-next-line camelcase
  const ordersList = await sales.findAll({ where: { userId: id } });
    // console.log(ordersList);
  return res.status(OK).json(ordersList);
};

const getUserOrder = async (req, res) => {
  const { id } = req.params;
  const order = await salesProducts.findAll({
    where: { saleId: id },
    attributes: ['quantity',
    [Sequelize.col('products.name'), 'name'],
    [Sequelize.col('sales.saleDate'), 'saleDate'],
    [Sequelize.col('sales.status'), 'status'],
    [Sequelize.literal('FORMAT((quantity * products.price), 2)'), 'productPrice']],
    include: [
      { model: products, attributes: [], as: 'products' },
      { model: sales, attributes: [], as: 'sales' },
    ],
  });

  return res.status(OK).json(order);
};

module.exports = { allOrdersByUser, getUserOrder };