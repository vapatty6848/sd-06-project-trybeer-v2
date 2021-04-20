const rescue = require('express-rescue');

const { SalesService } = require('../service');

const registerSale = rescue(async (req, res) => {
  const params = req.body;
  const registeredSale = await SalesService.registerSale(params);

  return res
    .status(201)
    .json(registeredSale);
});

const regSalesProducts = rescue(async (req, res) => {
  const params = req.body;

  const salesProducts = await SalesService.regSalesProducts(params);

  return res
    .status(201)
    .json(salesProducts);
});

module.exports = { registerSale, regSalesProducts };
