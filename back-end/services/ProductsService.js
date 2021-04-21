const { product } = require('../models');

const getAll = async () => product.findAll();

const getPriceAndNameById = async (id) => product.findByPk(id);

module.exports = {
  getAll,
  getPriceAndNameById,
};