const orderDetailsModel = require('../models/orderDetailsModel');

const saleDetails = (id) => orderDetailsModel.saleDetails(id);

module.exports = {
  saleDetails,
};
