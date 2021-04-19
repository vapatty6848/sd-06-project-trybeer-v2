const Model = require('../models/orderModels');

const create = async ({ userID, value, street, number, date, saleProduct }) => {
  const orders = await Model.create({ userID, value, street, number, date });
  const saleId = orders.insertId;
  saleProduct.forEach((e) => {
    Model.createSaleProduct(saleId, e.id, e.quantity);
  });
  return orders;
};

// Get all users
const getAll = async () => Model.getSales();

// Get id sale
const getBySalesId = async (id) => {
  const sale = await Model.getOrderByID(id);
  return sale;
};

module.exports = { 
  create,
  getAll,
  getBySalesId,
};
