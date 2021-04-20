const { Sale, SalesProduct } = require('../models');

const createSale = async ({ id, totalPrice, deliveryAddress, deliveryNumber, saleDate, saleProduct }) => {
  
  const orders = await Sale.create({ 
    totalPrice, 
    deliveryAddress,
    deliveryNumber,
    saleDate,
    userId: id,
  });

  const salesId = orders.id;

  saleProduct.forEach((e) => {
    SalesProduct.create({salesId, productId: e.id, quantity: e.quantity});
  });

  return orders;
};

// Get all users
const getAll = async () => Sale.findAll();

// Get id sale
const getBySalesId = async (id) => {
  const sale = await Sale.findByPk(id);
  return sale;
};

module.exports = { 
  createSale,
  getAll,
  getBySalesId,
};
