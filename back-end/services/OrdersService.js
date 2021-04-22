const { sale, saleProduct, product } = require('../models');

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

const createSaleProduct = (productId, quantity, saleId) => saleProduct
  .create({ productId, quantity, saleId });

const createOrderProductService = async ({ cart, saleId }) => {
  const promises = cart.map(({ id: productId, quantity }) => (
    createSaleProduct(productId, quantity, saleId)));
  await Promise.all(promises);
};

const getById = async (id) => {
  const specificSale = await sale.findAll({
  include: [{ model: product, required: true, as: 'products' }],
  where: { id },
  });
  const products = specificSale[0].products.map((item) => {
    const productsAndQt = { 
      ...item.dataValues,
      quantity: item.saleProduct.quantity,
    };
    const { quantity, name, price } = productsAndQt;
    const { status } = specificSale[0].dataValues;
    return { quantity, name, price, status };
  });
  return products;
};

const alter = async ({ id, status }) => sale.update({ status }, { where: { id } });

const getAll = async () => sale.findAll();

const getAllByUser = async (id) => {
  const sales = sale.findAll({ where: { userId: id } });
  return sales;
};

const getByIdAdmin = async (id) => {
  const specificSale = await sale.findAll({
  include: [{ model: product, required: true, as: 'products' }],
  where: { id },
  });
  const products = specificSale[0].products.map((item) => {
    const productsAndQt = { ...item.dataValues, quantity: item.saleProduct.quantity };
    const { saleProduct: saleProducts, urlImage, ...importantData } = productsAndQt;
    return importantData;
  });
  const data = {
    products,
    saleId: id,
    totalPrice: specificSale[0].totalPrice,
    status: specificSale[0].status,
  };
  return data;
};

module.exports = {
  createOrderService,
  getAll,
  getAllByUser,
  alter,
  createOrderProductService,
  getById,
  getByIdAdmin,
};
