const { sales, salesProducts } = require('../database/models');

const registerSale = async (params) => {
  const createSale = await sales.create(params);
  return createSale.dataValues;
};

const regSalesProducts = async (params) => {
  const regSale = await salesProducts.create(params);
  return regSale.dataValues;
};

module.exports = { registerSale, regSalesProducts };
