const { sales, products, users } = require('../models/sql/models');
const { authUpdateSale, authDetailsSale } = require('../schemas');

const getAll = async () => sales.findAll();

const getSaleById = async (saleId, userRole) => {
  const result = await sales.findOne({
    where: { id: saleId },
    include: [
      {
        model: products,
        as: 'products',
        through: { attributes: ['quantity'], as: 'sale' },
      },
      {
        model: users,
        attributes: ['name'],
      },
    ],
  });
  authDetailsSale(result, 1, userRole);

  return result;
};

const updateSaleStatus = async (saleId, status) => {
  authUpdateSale(saleId, status);
  const result = await sales.update(
    { status },
    { where: { id: saleId } },
  );
  return result;
};

module.exports = {
  getAll,
  getSaleById,
  updateSaleStatus,
};
