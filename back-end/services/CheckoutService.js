const tokenValidation = require('../utils/tokenValidation');
const { BAD_REQUEST, OK } = require('../utils/allStatusCode');
const { priceById, createSale } = require('../models/CheckoutModel');

const dataValidate = (deliveryNumber, deliveryAddress, salesProducts, res) => {
  const objErr = (err, status) => { res.status(status).json({ status, err }); }; 
  const errorDeliveryNumber = Number.isNaN(deliveryNumber);
  const errorDeliveryAddress = !deliveryAddress;
  const errorSalesProducts = salesProducts.length < 1;
  if (errorDeliveryNumber) objErr('Delivery number, must be a number', BAD_REQUEST);
  if (errorDeliveryAddress) objErr('Address field, must be filled', BAD_REQUEST);
  if (errorSalesProducts) objErr('Sales Products can not be empty', BAD_REQUEST);
};

const CheckoutServices = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  const { deliveryAddress, deliveryNumber, salesProducts } = req.body;
  const saleDate = new Date();
  const saleStatus = 'PENDING';

  dataValidate(deliveryNumber, deliveryAddress, salesProducts, res);

  const totalPrice = await salesProducts.reduce(async (total, element) => {
    const productId = parseInt(element[0], 10);
    const productQuantity = parseInt(element[1], 10);
    const [[{ price }]] = await priceById(productId);
    const unityPrice = price * productQuantity;
    return (Math.trunc(((await total) + unityPrice) * 100) / 100);
  }, 0);
  const data = {
    id, totalPrice, deliveryAddress, deliveryNumber, salesProducts, saleDate, saleStatus };
  await createSale(data);

  return res.status(OK).json(data);
};

module.exports = CheckoutServices;