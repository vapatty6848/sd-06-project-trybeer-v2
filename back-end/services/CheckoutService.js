const tokenValidation = require('../utils/tokenValidation');
const { BAD_REQUEST, OK } = require('../utils/allStatusCode');
const { products, sales, sales_products } = require('../models');

const dataValidate = (deliveryNumber, deliveryAddress, salesProducts, res) => {
  const objErr = (err, status) => { res.status(status).json({ status, err }); }; 
  const errorDeliveryNumber = Number.isNaN(deliveryNumber);
  const errorDeliveryAddress = !deliveryAddress;
  const errorSalesProducts = salesProducts.length < 1;
  if (errorDeliveryNumber) objErr('Delivery number, must be a number', BAD_REQUEST);
  if (errorDeliveryAddress) objErr('Address field, must be filled', BAD_REQUEST);
  if (errorSalesProducts) objErr('Sales Products can not be empty', BAD_REQUEST);
};

const totalPriceFunc = (salesProducts) => salesProducts.reduce(async (total, element) => {
  const productId = parseInt(element[0], 10);
  const productQuantity = parseInt(element[1], 10);
  const { dataValues: { price } } = await products.findByPk(productId);
  const unityPrice = price * productQuantity;
  return (Math.trunc(((await total) + unityPrice) * 100) / 100);
}, 0);

const dataFormat = (user_id, total_price, delivery_address, delivery_number, status) => ({
  user_id,
  total_price,
  delivery_address, 
  delivery_number,
  status,
});

const salesFormat = (
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleStatus,
    saleDate,
    salesProducts,
  ) => ({
    id,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleStatus,
    saleDate,
    salesProducts,
});

const saleStatus = 'PENDING';
const CheckoutServices = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = tokenValidation(authorization);
  const { deliveryAddress, deliveryNumber, salesProducts } = req.body;

  dataValidate(deliveryNumber, deliveryAddress, salesProducts, res);

  const { dataValues: saleTable } = await sales
    .create(
      dataFormat(id, totalPriceFunc(salesProducts), deliveryAddress, deliveryNumber, saleStatus),
    );

  const newSalesProducts = [];
  salesProducts.forEach((element) => newSalesProducts.push([saleTable.id, ...element]));

  newSalesProducts
    .forEach(async ([sale_id, product_id, quantity]) => {
      await sales_products.create({ sale_id, product_id, quantity });
    });
  
  const { user_id, total_price, delivery_address, delivery_number, status, sale_date } = saleTable;
  const saleReturn = salesFormat(user_id,
    total_price, delivery_address, delivery_number, status, sale_date, salesProducts);
  
  return res.status(OK).json(saleReturn);
};

module.exports = CheckoutServices;
