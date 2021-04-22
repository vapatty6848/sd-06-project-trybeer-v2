const models = require('../models');
const { throwThisError } = require('../Utils');

const registerNewOrder = async (req, res) => {
  const { email, orderValue, address, number, products } = req.body;

  const { dataValues: { id } } = await models.users.findOne({ where: { email } });

  const order = {
    userId: id,
    totalPrice: orderValue,
    deliveryAddress: address,
    deliveryNumber: number,
    saleDate: new Date(),
    status: 'Pendente',
  };

  const newOrderData = await models.sales.create(order);
  const saleId = newOrderData.dataValues.id;
  products.forEach(async (product) => {
    await models.sales_products
      .create({ saleId, productId: product.id, quantity: product.quantity });
  });

  res.status(200).json({ message: 'OK' });
};

const getOrdersByUser = async (req, res) => {
  const { useremail } = req.params;
  const userByEmailData = await models.users.findOne({ where: { email: useremail } });
  const userId = userByEmailData.dataValues.id;
  const salesByUserData = await models.sales.findAll({ where: { userId } });
  const salesByUser = Object.values(salesByUserData).map((sale) => sale.dataValues);
  if (!salesByUser) throwThisError(500, 'Internal error');

  res.status(200).json(salesByUser);
};

const getOrderDetails = async (req, res) => {
  try {
    const { saleid } = req.params;
    console.log('cheguei no orderDetails');
    const orderProductsDetailsData = await models.sales
      .findOne({
        where: { id: saleid },
        include: [{ model: models.products, as: 'products' }],
      });

    res.status(200).json(orderProductsDetailsData);
  } catch (e) {
    console.error(e.message);
  }
};

const getAdminOrders = async (_req, res) => {
  const ordersData = await models.sales.findAll();

  res.status(200).json(ordersData);
};

const getAdminOrderDetails = async (req, res) => {
  const { id } = req.params;
  
  const orderProductsDetailsData = await models.sales.findOne({
    where: { id },
    include: [{ model: models.products, as: 'products' }],
  });
  res.status(200).json(orderProductsDetailsData);
};

const editOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  await models.sales.update({ status }, { where: { id } });
  
  res.status(200).json({ message: 'ok' });
};

module.exports = {
  registerNewOrder,
  getOrdersByUser,
  getOrderDetails,
  getAdminOrders,
  getAdminOrderDetails,
  editOrderStatus,
};