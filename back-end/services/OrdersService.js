const ordersModel = require('../models/OrdersModel');

const createOrderService = async (sale) => {
  const {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  } = sale;

  const status = 'Pendente';

  const newOrder = await ordersModel
  .createOrder({ userId, totalPrice, deliveryAddress, deliveryNumber, status });
  
  return newOrder;
};

const createOrderProductService = async ({ cart, saleId }) => {
  cart.forEach(async (item) => {
    await ordersModel
    .createOrderProduct({ item, saleId });
  });
};

const getById = async (id) => ordersModel.getById(id);

const alter = async ({ id, status }) => ordersModel.alter({ id, status });

const getAll = async () => ordersModel.getAll();

const getByIdAdmin = async (id) => ordersModel.getByIdAdmin(id);

const getAllByUser = async (id) => ordersModel.getAllByUser(id);

module.exports = {
  createOrderService,
  getAll,
  getAllByUser,
  alter,
  createOrderProductService,
  getById,
  getByIdAdmin,
};