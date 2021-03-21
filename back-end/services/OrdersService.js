const { Order } = require('../models');

const registerOrder = async (pedido) => Order.registerOrder(pedido);

const registerEachProduct = async (saleId, products) => Order
  .registerEachProduct(saleId, products);

const getOrders = async (userId) => Order.getOrders(userId);

module.exports = {
  registerOrder,
  registerEachProduct,
  getOrders,
};
