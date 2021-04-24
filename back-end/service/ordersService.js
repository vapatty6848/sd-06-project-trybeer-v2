const { sales, products, salesProducts } = require('../models');

const createOrders = async (userId, sale) => {
  try {
    return await sales.create({ 
      userId,
      totalPrice: sale.totalPrice,
      deliveryAddress: sale.address,
      deliveryNumber: sale.number,
      saleDate: sale.date,
      status: sale.orderStatus,
     });
  } catch (error) {
    console.log(error.message);
  }
};

const getOrders = async (userId) => {
  const allSales = sales.findAll({
    where: {
      userId,
    },
  });
  return allSales;
};

// NÃO ESTAMOS USANDO ESSA FUNÇÃO!!!
// const getLastSaleId = async () => {
//   sales.findAll({
//     attributes: [[sequelize.fn('max', sequelize.col('id')), 'lasSaleId']],
//     raw: true,
//   });
// }

const createProductsSales = async (mySaleProducts) => {
  salesProducts.create(mySaleProducts);
};

const getSaleDetail = (saleId) => sales.findByPk(saleId, { include: [
    { model: products, 
      as: 'products', 
      through: { // through trás os dados da tabela intermediária salesProducts, esperando um array de nome Attributes, se passar vazio não vem nada, do contrário passar por string.
      attributes: ['saleId', 'quantity'],
    } },
    ] });

const getAllSales = async () => sales.findAll(); 

const updateSale = async (saleId, saleStatus) => {
  sales.update(
  { status: saleStatus },
  { where: { id: saleId } },
  );
};

module.exports = {
  createOrders,
  getOrders,
  // getLastSaleId,
  createProductsSales,
  getSaleDetail,
  getAllSales,
  updateSale,
};
