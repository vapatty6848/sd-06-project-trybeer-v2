const { Sale, SalesProduct } = require('../models');

const createSale = async (
  { id, totalPrice, deliveryAddress, deliveryNumber, saleDate, saleProduct },
  ) => {
  const orders = await Sale.create({ 
    totalPrice, 
    deliveryAddress,
    deliveryNumber,
    saleDate,
    userId: id,
  });

  const saleId = orders.id;

  saleProduct.forEach(async (e) => {
    await SalesProduct.create({ saleId, productId: e.id, quantity: e.quantity });
  });

  console.log(orders);

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
