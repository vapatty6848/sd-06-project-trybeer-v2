const { sale, sale_product, product } = require('../models');

const createOrderService = async (requestSale) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  } = requestSale;

  const status = 'Pendente';
  const saleDate = new Date('2011-08-01T19:58:00.000Z');
   
  const newOrder = await sale
  .create({ userId, totalPrice, deliveryAddress, deliveryNumber, status, saleDate });
  
  return newOrder;
};

const createSaleProduct = (productId, quantity, saleId) => sale_product
  .create({ productId, quantity, saleId });

const createOrderProductService = async ({ cart, saleId }) => {
  const promises = cart.map(({ productId, quantity }) => (
    createSaleProduct(productId, quantity, saleId)));
  await Promise.all(promises);
};

const getById = async (id) => sale.findAll({
  include: [{ model: product, required: true, as: 'products' }],
  where: { id },
});

// getById(1)
//   .then((resp) => {
//     console.log(resp[0].dataValues);
//   });

const alter = async ({ id, status }) => sale.update({ status }, { where: { id } });

const getAll = async () => sale.findAll();

const getAllByUser = async (id) => sale.findAll({ where: { id } });

// const getByIdAdmin = async (id) => ordersModel.getByIdAdmin(id);
const getByIdAdmin = async (id) => sale.findAll({
  include: [{ model: product, required: true, as: 'products' }],
  where: { id },
});

module.exports = {
  createOrderService,
  getAll,
  getAllByUser,
  alter,
  createOrderProductService,
  getById,
  getByIdAdmin,
};
