const { products } = require('../models/sql/models');

const getAll = async () => products.findAll();

module.exports = {
  getAll,
};
