const { sale, product } = require('../models');

const getAllOrders = async () => sale.findAll();

const updateStatus = async (id, status) => sale.update({ status }, { where: { id } });

const getOrderDetailsById = async (id) => (sale.findOne({ 
  where: { id },
  include: [{ model: product, as: 'product', through: { attributes: ['quantity'] } }], /* By Coruja */
}));

module.exports = {
  getAllOrders,
  updateStatus,
  getOrderDetailsById,
};