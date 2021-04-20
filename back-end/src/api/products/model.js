const { products } = require('../../database/sequelize/models');

const findAll = () => products.findAll();

module.exports = {
  findAll,
};
