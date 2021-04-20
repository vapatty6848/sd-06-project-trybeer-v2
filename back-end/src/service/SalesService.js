const { SalesModel } = require('../model');

const registerSale = async (params) => SalesModel.registerSale(params);

const regSalesProducts = async (params) => SalesModel.regSalesProducts(params);

module.exports = { registerSale, regSalesProducts };
