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

const saleStatus = 'PENDING';
// eslint-disable-next-line max-lines-per-function
const CheckoutServices = async (req, res) => {
  const { authorization } = req.headers;
  const payload = tokenValidation(authorization);
  const { id } = payload;
  const { deliveryAddress, deliveryNumber, salesProducts } = req.body;

  dataValidate(deliveryNumber, deliveryAddress, salesProducts, res);

  const totalPrice = await salesProducts.reduce(async (total, element) => {
    const productId = parseInt(element[0], 10);
    const productQuantity = parseInt(element[1], 10);
    const { dataValues: { price } } = await products.findByPk(productId);
    const unityPrice = price * productQuantity;
    return (Math.trunc(((await total) + unityPrice) * 100) / 100);
  }, 0);

  const data = {
    user_id: id,
    total_price: totalPrice,
    delivery_address: deliveryAddress, 
    delivery_number: deliveryNumber,
    status: saleStatus,
  };

  const { dataValues: saleTable } = await sales.create(data);

  const newSalesProducts = [];
  salesProducts.forEach((element) => { 
    newSalesProducts.push([saleTable.id, ...element]);
  });

  newSalesProducts.forEach(async ([sale_id, product_id, quantity]) => {
    await sales_products.create({
      sale_id,
      product_id,
      quantity,
    });
  });

  const saleReturn = {
    id: saleTable.user_id,
    totalPrice: saleTable.total_price,
    deliveryAddress: saleTable.delivery_address,
    deliveryNumber: saleTable.delivery_number,
    saleStatus: saleTable.status,
    saleDate: saleTable.sale_date,
    salesProducts,
  };
  
  return res.status(OK).json(saleReturn);
};

module.exports = CheckoutServices;
