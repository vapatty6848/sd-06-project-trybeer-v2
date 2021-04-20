const { sales, sales_products } = require('../models');

// const ordersModel = require('../model/ordersModel');

const createOrders = async (sale) => sales.create(sale);

const getOrders = async (userId) => {
  // const sales = ordersModel.getOrders(userId);
  // return sales;
  sales.findAll({
    where: {
      userId,
    },
  });
};

const getLastSaleId = async () => {
  const lastOrderId = ordersModel.getLastSaleId();
  return lastOrderId;
};

const createProductsSales = async (mySaleProducts) => {
    ordersModel.createProductsSales(mySaleProducts);
};

const getSaleDetail = async (saleId) => {
  const saleDetail = await ordersModel.getSaleDetail(saleId);
  // console.log('entrei no service', saleDetail);
  return saleDetail;
};

const getAllSales = async () => {
  const allSales = await ordersModel.getAllSales();
  // console.log('entrei no service', allSales);
  return allSales;
};

const updateSale = async (saleId) => {
  await ordersModel.updateSale(saleId);

  // console.log('entrei no orders service', saleId);
};

module.exports = {
  createOrders,
  getOrders,
  getLastSaleId,
  createProductsSales,
  getSaleDetail,
  getAllSales,
  updateSale,
};
