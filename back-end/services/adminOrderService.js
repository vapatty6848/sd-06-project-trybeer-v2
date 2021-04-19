const adminOrderModel = require('../models/adminOrderModel');

const allOrders = () => adminOrderModel.allOrders();
const changeStatus = (id) => adminOrderModel.changeStatus(id);

module.exports = {
  allOrders,
  changeStatus,
};
