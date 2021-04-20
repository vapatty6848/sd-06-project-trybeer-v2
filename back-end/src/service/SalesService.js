const { sales, salesProducts } = require('../database/models');

const registerSale = async (params) => sales.create(params);

const regSalesProducts = async (params) => salesProducts.create(params);

module.exports = { registerSale, regSalesProducts };
