const { sale, saleProduct, product } = require('../models');

const createOrder = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  const saleDate = new Date();
  const status = 'Pendente';
  const response = await sale.create(
    { userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status },
  );
  
  return response.dataValues.id;
};

const updateSalesProduct = async (insertId, checkoutProducts) => {
  const bulkInsert = checkoutProducts.map(({ id: productId, productQuantity: quantity }) => (
    { saleId: insertId, productId, quantity }
  ));

  return saleProduct.bulkCreate(bulkInsert);
};

const getOrdersByUser = async (userId) => sale.findAll({ where: { userId } });

const getOrderDetailsById = async (id) => sale.findOne({ 
  where: { id },
  include: [{ model: product, as: 'product', through: { attributes: ['quantity'] } }], /* By Coruja */
});

module.exports = {
  createOrder,
  updateSalesProduct,
  getOrdersByUser,
  getOrderDetailsById,
};
