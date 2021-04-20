const { sales } = require('../database/models');

const getOrdersById = async (id) => sales.findByPk({ where: id });

const updateStatusOrder = async (status, id) => sales.update({ status }, { where: id });

const getAllOrders = async () => sales.findAll();

const getAllOrdersByUser = async (id) => sales.findAll({ where: id });

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
