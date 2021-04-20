const { sales } = require('../database/models');

const getOrdersById = async (id) => {
  console.log("id", id);
  const sale = await sales.findByPk(id);
console.log('sale', sale.dataValues);
return [sale.dataValues];
}

const updateStatusOrder = async (status, id) => {
  const updatedSale = await sales.update({ status }, { where: { id } });
  console.log('Updated', updatedSale);
  return updatedSale.dataValues;
};

const getAllOrders = async () => sales.findAll();

const getAllOrdersByUser = async (id) => sales.findAll({ where: { id } });

module.exports = {
  getAllOrdersByUser,
  updateStatusOrder,
  getOrdersById,
  getAllOrders,
};
