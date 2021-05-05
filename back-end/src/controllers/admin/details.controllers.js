const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { adminError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { params: { id }, userRole } = req;
    const sale = await admin.getSaleById(id, userRole);
    return res.status(StatusCodes.OK).json(sale);
  } catch (err) {
    return next({ ...adminError, err });
  }
};
