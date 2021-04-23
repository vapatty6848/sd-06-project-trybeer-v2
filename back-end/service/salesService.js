const { sales } = require('../models');

const getOrders = async (userId) => sales.findAll({
  where: {
    id: userId,
  },
});

const getAllSales = async () => sales.findAll();

module.exports = {
  getOrders,
  getAllSales,
};
