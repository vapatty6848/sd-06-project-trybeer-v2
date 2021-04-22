const { sales, products } = require('../database/models');

const getOrdersById = async (id) => {
 // console.log('id', id);
  const sale = await sales.findAll({
    where: { id },
    include: [{ model: products, as: 'products' }],
  });

return sale;
};

const updateStatusOrder = async (status, id) => {
  const updatedSale = await sales.update({ status }, { where: { id } });
  console.log('Updated', updatedSale);
  return updatedSale.dataValues;
};

const getAllOrders = async () => sales.findAll();

const getAllOrdersByUser = async (id) => sales.findAll({ where: { userId: id } });

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
