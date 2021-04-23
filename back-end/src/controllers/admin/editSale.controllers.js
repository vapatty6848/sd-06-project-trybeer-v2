const { StatusCodes } = require('http-status-codes');
const { admin } = require('../../services');
const { salesError } = require('./error');

module.exports = async (req, res, next) => {
  try {
    const { body: { delivered }, params: { id: saleId } } = req;
    await admin.updateSaleStatus(saleId, delivered);
    return res.status(StatusCodes.OK).json({
      message: 'Success',
      updatedTo: delivered,
    });
  } catch (err) {
    return next({ ...salesError, err });
  }
};
