const { Orders } = require('../models');

const registerOrder = async (pedido) => Orders.registerOrder(pedido);

const registerEachProduct = async (saleId, products) => {
  Orders.registerEachProduct(saleId, products);
};

const getOrders = async (userId) => Orders.getOrders(userId);

module.exports = {
  registerOrder,
  registerEachProduct,
  getOrders,
};
