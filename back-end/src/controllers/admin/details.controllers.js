const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { adminError } = require('./error');

const errors = {
  C_ERR_SALE_NOT_FOUND: 'C_ERR_SALE_NOT_FOUND',
};

module.exports = async (req, res, next) => {
  try {
    const { params: { id }, userRole } = req;
    const sale = await admin.getSaleById(id, userRole);
    if (!sale) res.status(StatusCodes.NOT_FOUND).json(errors.C_ERR_SALE_NOT_FOUND);
    return res.status(StatusCodes.OK).json(sale);
  } catch (err) {
    return next({ ...adminError, err });
  }
};
