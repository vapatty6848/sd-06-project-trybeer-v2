const cartModel = require('../model/cartModel');

const addSale = (sale) => cartModel.addSale(sale);

const addSaleProduct = (salesProducts) => (
  cartModel.addSaleProduct(salesProducts)
);

const getAllSales = () => cartModel.getAllSales();

module.exports = {
  addSale,
  addSaleProduct,
  getAllSales,
};
