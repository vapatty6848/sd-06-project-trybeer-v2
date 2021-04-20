const orderDetailsModel = require('../model/orderDetailsModel');

const saleDetails = (id) => orderDetailsModel.saleDetails(id);

module.exports = {
  saleDetails,
};
