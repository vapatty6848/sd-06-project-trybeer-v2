const { sales, products, users } = require('../models/sql/models');
const { authUpdateSale, authDetailsSale } = require('../schemas');

const errors = {
  C_ERR_ACC_DND: 'C_ERR_ACC_DND',
  C_ERR_SALE_NOT_FOUND: 'C_ERR_SALE_NOT_FOUND',
};

const getAll = async () => sales.findAll();

const getSaleById = async (saleId, userRole) => {
  if (userRole !== 'administrator') throw new Error(errors.C_ERR_ACC_DND);
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

  if (result[0] < 1) throw new Error(errors.C_ERR_SALE_NOT_FOUND);
  return result;
};

module.exports = {
  getAll,
  getSaleById,
  updateSaleStatus,
};
