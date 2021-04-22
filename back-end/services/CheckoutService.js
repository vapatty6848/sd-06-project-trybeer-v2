const tokenValidation = require('../utils/tokenValidation');
const { BAD_REQUEST, OK } = require('../utils/allStatusCode');
const { products, sales, salesProducts } = require('../models');

const dataValidate = (deliveryNumber, deliveryAddress, salesProductsParam, res) => {
  const objErr = (err, status) => { res.status(status).json({ status, err }); }; 
  const errorDeliveryNumber = Number.isNaN(deliveryNumber);
  const errorDeliveryAddress = !deliveryAddress;
  const errorSalesProducts = salesProductsParam.length < 1;
  if (errorDeliveryNumber) objErr('Delivery number, must be a number', BAD_REQUEST);
  if (errorDeliveryAddress) objErr('Address field, must be filled', BAD_REQUEST);
  if (errorSalesProducts) objErr('Sales Products can not be empty', BAD_REQUEST);
};

const funcTotalPrice = (salesProductsParam) => salesProductsParam.reduce(async (total, element) => {
  const productId = parseInt(element[0], 10);
  const productQuantity = parseInt(element[1], 10);
  const { dataValues: { price } } = await products.findByPk(productId);
  const unityPrice = price * productQuantity;
  return (Math.trunc(((await total) + unityPrice) * 100) / 100);
}, 0);

const saleStatus = 'PENDING';
const CheckoutServices = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  const { deliveryAddress, deliveryNumber, salesProducts: salesProductsParam } = req.body;

  dataValidate(deliveryNumber, deliveryAddress, salesProductsParam, res);

  const totalPrice = await funcTotalPrice(salesProductsParam);

  const data = { userId: id, totalPrice, deliveryAddress, deliveryNumber, status: saleStatus };

  const { dataValues: saleTable } = await sales.create(data);

  const newSalesProducts = [];
  salesProductsParam.forEach((element) => newSalesProducts.push([saleTable.id, ...element]));

  newSalesProducts.forEach(async ([saleId, productId, quantity]) => {
    await salesProducts.create({ saleId, productId, quantity });
  });

  return res.status(OK).json({ ...saleTable, salesProducts: salesProductsParam });
};

module.exports = CheckoutServices;
