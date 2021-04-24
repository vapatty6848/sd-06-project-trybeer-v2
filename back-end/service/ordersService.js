const { sales, products, sales_products } = require('../models');

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

// NÃO ESTAMOS USANDO ESSA FUNÇÃO!!!
// const getLastSaleId = async () => {
//   sales.findAll({
//     attributes: [[sequelize.fn('max', sequelize.col('id')), 'lasSaleId']],
//     raw: true,
//   });
// }

const createProductsSales = async (mySaleProducts) => {
  sales.create(mySaleProducts);
};
// const createProductsSales = async (mySaleProducts) => {
//     ordersModel.createProductsSales(mySaleProducts);
// };

const getSaleDetail = (saleId) => {
  sales.findAll({
    where: { saleId },
    include: [{
      model: products, as: 'product',
      model: sales_products , as: 'saleProducts',
      model: sales, as: 'sale',
    }],
  });
};

// const getSaleDetail = async (saleId) => {
//   const saleDetail = await ordersModel.getSaleDetail(saleId);
//   console.log('entrei no service', saleDetail);
//   return saleDetail;
// };

const getAllSales = async () => sales.findAll();
// const getAllSales = async () => {
// const allSales = await ordersModel.getAllSales();
// console.log('entrei no service', allSales);
//   return allSales;
// };

const updateSale = async (saleId, saleStatus) =>
  sales.update({ status: saleStatus }, { where: { id: saleId } });
// const updateSale = async (saleId) => {
//   await ordersModel.updateSale(saleId);

//   console.log('entrei no orders service', saleId);
// };

module.exports = {
  createOrders,
  getOrders,
  // getLastSaleId,
  createProductsSales,
  getSaleDetail,
  getAllSales,
  updateSale,
};
