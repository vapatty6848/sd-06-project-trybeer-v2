const { createSales, createSalesProducts } = require('../models');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const { ThrowError } = require('../middlewares/errorHandler/errorHandler');

const createSaleService = async (payload, products) => {
  if (!payload) throw new ThrowError(status.BAD_REQUEST, messages.NO_EMPTY_FIELDS);
  const response = await createSales.create(payload);
  const { insertId } = response;
  const insertProducts = products.map((product) => (
      { saleId: insertId, productId: product.id, quantity: product.quantity }
    ));
  await createSalesProducts.bukCreate(insertProducts);
  return response;
};

const getAllSales = async () => {
  const sales = await SalesModel.getAllSales();
  return sales;
};

const getSaleById = async (saleId) => {
  const sale = await SalesModel.getSaleById(saleId);
  const saleProducts = await SalesModel.getSaleProducts(saleId);
  const responsePayload = {
    sale: sale[0],
    saleProducts,
  };
  return responsePayload;
};

const fullfilSale = async (saleId) => {
  const sale = await SalesModel.fullfilSale(saleId);
  return sale;
};

/**
 * Lista venda detalhada filtrada  pelo id da venda
 * @param {String} id 
 * @returns Object contendo detalhes da venda
 */
const getSalesById = async (id) => {
  const result = await SalesModel.getSalesById(id);
  return result;
};

module.exports = {
  getSaleById,
  getAllSales,
  createSaleService,
  fullfilSale,
  getSalesById,
};
