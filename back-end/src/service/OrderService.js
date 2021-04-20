const { sales, salesProducts, products } = require('../database/models');

const getOrdersById = async (id) => {
  const sale = await sales.findAll(
    { where: { id }}, 
    { include: [
      // { model: salesProducts, as: 'saleProduct', include: 
      { model: products, as: 'saleProduct' }],
    });
  console.log('sale', sale[0]);
  return sale[0].dataValues;
};

const updateStatusOrder = async (status, id) => {
  const updatedSale = await sales.update({ status }, { where: { id } });
  console.log('Updated', updatedSale);
  return updatedSale.dataValues;
};

const getAllOrders = async () => sales.findAll();

const getAllOrdersByUser = async (id) => sales.findAll({ where: { id } });

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
