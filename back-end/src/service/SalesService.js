const { sales, salesProducts } = require('../database/models');

const registerSale = async (params) => {
  const createSale = await sales.create(params);
  return createSale;
};

const regSalesProducts = async (params) => {
  const regSale = await salesProducts.create(params);
  return regSale;
};

module.exports = { registerSale, regSalesProducts };
