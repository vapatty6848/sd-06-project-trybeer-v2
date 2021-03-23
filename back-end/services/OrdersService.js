const { Order } = require('../models');

const registerOrder = async (pedido) => Order.registerOrder(pedido);

const registerEachProduct = async (saleId, products) => Order
  .registerEachProduct(saleId, products);

const getOrders = async (userEmail) => Order.getOrders(userEmail);

const getOrderDetailsByid = async (id) => Order.getOrderDetailsByid(id);

module.exports = {
  registerOrder,
  registerEachProduct,
  getOrders,
  getOrderDetailsByid,
};
