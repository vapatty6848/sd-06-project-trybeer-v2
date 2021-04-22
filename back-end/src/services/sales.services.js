const { sales, products } = require('../models/sql/models');
const { authNewSale, authDetailsSale } = require('../schemas');

const getSaleProducts = async (sale) => {
  const promise = sale
    .map(async (prod) => products.findOne({ where: { id: prod.productId } }));
  const saleProducts = await Promise.all(promise);
  return saleProducts;
};

const validateTotalPrice = async (sale, saleProducts, salePrice) => {
  const totalPrice = Number(sale.reduce((acc, { productId, quantity }) =>
    acc + Number(saleProducts.find((el) => el.id === productId).price) * quantity, 0).toFixed(2));

  if (Number(salePrice) !== totalPrice) throw new Error('C_ERR_PRICE');
};

const create = async (body, userId) => {
  const { sale, salePrice, delivery } = body;
  authNewSale(body, userId);
  const getProducts = await getSaleProducts(sale);
  await validateTotalPrice(sale, getProducts, salePrice);
  const newSale = await sales.create({
    totalPrice: salePrice,
    deliveryAddress: delivery.address,
    deliveryNumber: delivery.number,
    userId,
    status: 'Pendente',
  });
  const promise = sale
    .map(async (prod) => {
      const product = getProducts.find((curr) => prod.productId === curr.dataValues.id);
      newSale.addProduct(product, { through: { quantity: prod.quantity } });
  });
  await Promise.all(promise);
  return newSale;
};

const getById = async (userId) => sales.findAll({ where: { userId } });

const filterByUserId = async (saleId, userId, userRole) => {
  const result = await sales.findOne({
    where: { id: saleId },
    include: {
      model: products,
      as: 'products',
      through: { attributes: ['quantity'], as: 'sale' },
    },
  });
  authDetailsSale(result, userId, userRole);
  return result.dataValues;
};

module.exports = {
  create,
  getById,
  filterByUserId,
};
